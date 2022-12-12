/* --- Models --- */
import { OrderInformationModel } from '../../orders/models/order-information.model';
import { PaymentInformationModel } from '../../orders/models/payment-information.model';
import { ProcessingInformationModel } from '../../orders/models/processing-information.model';
import { ClientReferenceInformationModel } from '../../users/models/client-reference-information.model';

export interface IPayload {
  clientReferenceInformation: ClientReferenceInformationModel;
  orderInformation: OrderInformationModel;
  paymentInformation: PaymentInformationModel;
  processingInformation: ProcessingInformationModel;
}
