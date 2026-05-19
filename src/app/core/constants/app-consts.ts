export class AppConsts {
  static remoteServiceBaseUrl: string;
  static appBaseUrl: string;
  static appBaseHref: string = '/';

  static readonly authorization = {
    encryptedAuthTokenName: 'enc_auth_token',
    authTokenName: 'Abp.AuthToken',
  };
}
