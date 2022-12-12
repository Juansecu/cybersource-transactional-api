export class CybersourceConfig {
  public static readonly AUTHENTICATION_TYPE: string = 'http_signature';
  public static readonly MERCHANT_ID: string = process.env.MERCHANT_ID;
  public static readonly MERCHANT_KEY_ID: string = process.env.MERCHANT_KEY_ID;
  public static readonly MERCHANT_SECRET_KEY = process.env.MERCHANT_SECRET_KEY;
  public static readonly RUN_ENVIRONMENT: string = process.env.CYBERSOURCE_HOST;
}

export const cybersourceConfig = {
  authenticationType: CybersourceConfig.AUTHENTICATION_TYPE,
  merchantID: CybersourceConfig.MERCHANT_ID,
  merchantKeyId: CybersourceConfig.MERCHANT_KEY_ID,
  merchantSecretKey: CybersourceConfig.MERCHANT_SECRET_KEY,
  runEnvironment: CybersourceConfig.RUN_ENVIRONMENT
};
