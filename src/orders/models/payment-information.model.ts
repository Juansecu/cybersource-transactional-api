import { CardModel } from '../../payment-methods/models/card.model';

export class PaymentInformationModel {
  constructor(public readonly card: CardModel) {}
}
