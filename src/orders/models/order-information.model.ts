/* --- Models --- */
import { AmountDetailsModel } from './amount-details.model';
import { CustomerModel } from '../../users/models/customer.model';

export class OrderInformationModel {
  constructor(
    public readonly amountDetails: AmountDetailsModel,
    public readonly billTo: CustomerModel
  ) {}
}
