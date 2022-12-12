/* --- Third-party libraries --- */
import { Test, TestingModule } from '@nestjs/testing';

/* --- Services --- */
import { CybersourceService } from './cybersource.service';

describe('CybersourceService', () => {
  let cybersourceService: CybersourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CybersourceService]
    }).compile();

    cybersourceService = module.get<CybersourceService>(CybersourceService);
  });

  it('cybersourceService should be defined', () => {
    expect(cybersourceService).toBeDefined();
  });

  it('#generateDigest should generate a digest', () => {
    cybersourceService.clientReferenceInformation = {
      code: 'test'
    };
    cybersourceService.orderInformation = {
      amountDetails: {
        currency: 'USD',
        totalAmount: '10.00'
      },
      billTo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        phoneNumber: '1234567890',
        address1: '1 Market St',
        locality: 'San Francisco',
        postalCode: '94105',
        administrativeArea: 'CA',
        country: 'US'
      }
    };
    cybersourceService.paymentInformation = {
      card: {
        type: '001',
        number: '4111111111111111',
        expirationMonth: '12',
        expirationYear: '2025',
        securityCode: '123'
      }
    };
    cybersourceService.processingInformation = {
      commerceIndicator: 'internet'
    };

    cybersourceService.generatePayload();

    expect(cybersourceService.generateDigest()).toBeDefined();
  });

  it('#generatePayload should generate payload', () => {
    cybersourceService.clientReferenceInformation = {
      code: 'test'
    };
    cybersourceService.orderInformation = {
      amountDetails: {
        currency: 'USD',
        totalAmount: '10.00'
      },
      billTo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        phoneNumber: '1234567890',
        address1: '1 Market St',
        locality: 'San Francisco',
        postalCode: '94105',
        administrativeArea: 'CA',
        country: 'US'
      }
    };
    cybersourceService.paymentInformation = {
      card: {
        type: '001',
        number: '4111111111111111',
        expirationMonth: '12',
        expirationYear: '2025',
        securityCode: '123'
      }
    };
    cybersourceService.processingInformation = {
      commerceIndicator: 'internet'
    };

    cybersourceService.generatePayload();

    expect(cybersourceService.payload).toBe(
      '{"clientReferenceInformation":{"code":"test"},"orderInformation":{"amountDetails":{"currency":"USD","totalAmount":"10.00"},"billTo":{"firstName":"John","lastName":"Doe","email":"john.doe@gmail.com","phoneNumber":"1234567890","address1":"1 Market St","locality":"San Francisco","postalCode":"94105","administrativeArea":"CA","country":"US"}},"paymentInformation":{"card":{"type":"001","number":"4111111111111111","expirationMonth":"12","expirationYear":"2025","securityCode":"123"}},"processingInformation":{"commerceIndicator":"internet"}}'
    );
  });
});
