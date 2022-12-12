export class CardModel {
  constructor(
    public readonly expirationMonth: string,
    public readonly expirationYear: string,
    public readonly number: string,
    public readonly securityCode: string,
    public readonly type: string
  ) {}
}
