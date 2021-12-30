export class MessageResDto {
  constructor(
    public readonly success: boolean = true,
    public readonly message: string = '',
    public readonly data: any = null
  ) {}
}
