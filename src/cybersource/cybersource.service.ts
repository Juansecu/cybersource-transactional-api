/* --- Engine modules --- */
import { createHash, createHmac, Hash } from 'crypto';

/* --- Third-party libraries --- */
import { Injectable } from '@nestjs/common';
import {
  ApiClient,
  CreatePaymentRequest,
  PaymentsApi,
  Ptsv2paymentsClientReferenceInformation,
  Ptsv2paymentsOrderInformation,
  Ptsv2paymentsOrderInformationAmountDetails,
  Ptsv2paymentsOrderInformationBillTo,
  Ptsv2paymentsPaymentInformation,
  Ptsv2paymentsPaymentInformationCard,
  Ptsv2paymentsProcessingInformation
} from 'cybersource-rest-client';
import { v4 } from 'uuid';

/* --- Configuration --- */
import { CybersourceConfig, cybersourceConfig } from './config/cybersource.config';

/* --- Types --- */
import { IPayload } from './typings/Cybersource';

/* --- Models --- */
import { OrderInformationModel } from '../orders/models/order-information.model';
import { PaymentInformationModel } from '../orders/models/payment-information.model';
import { ProcessingInformationModel } from '../orders/models/processing-information.model';
import { ClientReferenceInformationModel } from '../users/models/client-reference-information.model';

@Injectable()
export class CybersourceService {
  private _clientReferenceInformation: ClientReferenceInformationModel;
  private _orderInformation: OrderInformationModel;
  private _payload: string;
  private _paymentInformation: PaymentInformationModel;
  private _processingInformation: ProcessingInformationModel;

  private readonly _API_CLIENT: ApiClient = new ApiClient();

  get payload(): string {
    return this._payload;
  }

  set clientReferenceInformation(clientReferenceInformation: ClientReferenceInformationModel) {
    this._clientReferenceInformation = clientReferenceInformation;
  }

  set orderInformation(orderInformation: OrderInformationModel) {
    this._orderInformation = orderInformation;
  }

  set paymentInformation(paymentInformation: PaymentInformationModel) {
    this._paymentInformation = paymentInformation;
  }

  set processingInformation(processingInformation: ProcessingInformationModel) {
    this._processingInformation = processingInformation;
  }

  /**
   * Generates and returns the digest for the Cybersource API.
   * @returns `string`
   */
  generateDigest(): string {
    if (!this._payload) return null;
    const buffer: Buffer = Buffer.from(this._payload, 'utf8');
    const hash: Hash = createHash('sha256');

    hash.update(buffer);

    return hash.digest('base64');
  }

  /**
   * Generates the payload for the Cybersource API.
   *
   * If `_clientReferenceInformation`, `_orderInformation`, `_paymentInformation`, or
   * `_processingInformation` are not defined, the payload will not be generated.
   *
   * @returns `void`
   */
  generatePayload(): void {
    if (
      !this._clientReferenceInformation ||
      !this._orderInformation ||
      !this._paymentInformation ||
      !this._processingInformation
    )
      return;

    const payload: IPayload = {
      clientReferenceInformation: this._clientReferenceInformation,
      orderInformation: this._orderInformation,
      paymentInformation: this._paymentInformation,
      processingInformation: this._processingInformation
    };

    this._payload = JSON.stringify(payload);
  }

  /**
   * Generates and returns the HTTP signature for the Cybersource API.
   *
   * @param resourceUrl The resource URL
   * @param method The HTTP method
   * @returns `string`
   */
  getHttpSignature(resourceUrl: string, method: 'get' | 'post' | 'put'): string {
    if (!this._payload) return null;

    let data: Buffer;
    let key: Buffer;
    let signatureHeader: string = `keyid="${CybersourceConfig.MERCHANT_KEY_ID}", algorithm="HmacSHA256"`;
    let signatureString: string = '';
    let signatureValue: string = '';

    signatureHeader += ', headers="host date (request-target)';
    signatureString += `host: ${CybersourceConfig.RUN_ENVIRONMENT}`;
    signatureString += `\ndate: ${new Date().toUTCString()}`;
    signatureString += `\n(request-target): ${method} ${resourceUrl}`;

    if (method === 'get') signatureHeader += ' v-c-merchant-id"';
    else {
      const digest: string = this.generateDigest();

      signatureHeader += ` digest v-c-merchant-id"`;
      signatureString += `\ndigest: SHA-256=${digest}`;
    }

    signatureString += `\nv-c-merchant-id: ${CybersourceConfig.MERCHANT_ID}`;

    data = Buffer.from(signatureString, 'utf8');
    key = Buffer.from('process.env.MERCHANT_SECRET_KEY', 'base64');

    signatureValue = createHmac('sha256', key).update(data).digest('base64');

    signatureHeader += `, signature="${signatureValue}"`;

    return signatureHeader;
  }

  /**
   * Makes a payment request to the Cybersource API.
   *
   * @param paymentInformation The payment information
   * @param enableCapture Whether to enable transaction capture or not. Defaults: `false`
   * @returns `Promise<string>`
   */
  makeAuthorizationTransaction(
    orderInformationObject: OrderInformationModel,
    paymentInformationObject: PaymentInformationModel,
    enableCapture: boolean = false
  ): void {
    try {
      const clientReferenceInformation: Ptsv2paymentsClientReferenceInformation =
        new Ptsv2paymentsClientReferenceInformation();
      const orderInformation: Ptsv2paymentsOrderInformation =
        new Ptsv2paymentsOrderInformation();
      const orderInformationAmountDetails: Ptsv2paymentsOrderInformationAmountDetails =
        new Ptsv2paymentsOrderInformationAmountDetails();
      const orderInformationBillTo: Ptsv2paymentsOrderInformationBillTo =
        new Ptsv2paymentsOrderInformationBillTo();
      const paymentInformation: Ptsv2paymentsPaymentInformation =
        new Ptsv2paymentsPaymentInformation();
      const paymentInformationCard: Ptsv2paymentsPaymentInformationCard =
        new Ptsv2paymentsPaymentInformationCard();
      const processingInformation: Ptsv2paymentsProcessingInformation =
        new Ptsv2paymentsProcessingInformation();
      const paymentRequest: CreatePaymentRequest = new CreatePaymentRequest();
      const paymentsApi: PaymentsApi = new PaymentsApi(cybersourceConfig, this._API_CLIENT);

      clientReferenceInformation.code = `TRC${v4().replace(/-/g, '')}`;
      paymentRequest.clientReferenceInformation = clientReferenceInformation;

      processingInformation.capture = enableCapture;

      paymentInformationCard.number = paymentInformationObject.card.number;
      paymentInformationCard.expirationMonth = paymentInformationObject.card.expirationMonth;
      paymentInformationCard.expirationYear = paymentInformationObject.card.expirationYear;
      paymentInformationCard.securityCode = paymentInformationObject.card.securityCode;
      paymentInformationCard.type = paymentInformationObject.card.type;
      paymentInformation.card = paymentInformationCard;

      orderInformationAmountDetails.currency = orderInformationObject.amountDetails.currency;
      orderInformationAmountDetails.totalAmount =
        orderInformationObject.amountDetails.totalAmount;
      orderInformation.amountDetails = orderInformationAmountDetails;

      orderInformationBillTo.firstName = orderInformationObject.billTo.firstName;
      orderInformationBillTo.lastName = orderInformationObject.billTo.lastName;
      orderInformationBillTo.email = orderInformationObject.billTo.email;
      orderInformationBillTo.phoneNumber = orderInformationObject.billTo.phoneNumber;
      orderInformationBillTo.address1 = orderInformationObject.billTo.address1;
      orderInformationBillTo.locality = orderInformationObject.billTo.locality;
      orderInformationBillTo.postalCode = orderInformationObject.billTo.postalCode;
      orderInformationBillTo.administrativeArea =
        orderInformationObject.billTo.administrativeArea;
      orderInformationBillTo.country = orderInformationObject.billTo.country;
      orderInformation.billTo = orderInformationBillTo;

      paymentRequest.orderInformation = orderInformation;
      paymentRequest.paymentInformation = paymentInformation;
      paymentRequest.processingInformation = processingInformation;

      paymentsApi.createPayment(paymentRequest, (error: any, data: any, response: any) => {
        console.log('\n', error);
        console.log('\n', data);
        console.log('\n', response);
        if (error) throw new Error(error);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
