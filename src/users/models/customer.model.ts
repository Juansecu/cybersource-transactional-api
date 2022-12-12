export class CustomerModel {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly address1: string,
    public readonly locality: string,
    public readonly postalCode: string,
    public readonly administrativeArea: string,
    public readonly country: string
  ) {}
}
