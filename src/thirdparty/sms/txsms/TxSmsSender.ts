import * as tencentcloud from 'tencentcloud-sdk-nodejs';
const CvmClient = tencentcloud.cvm.v20170312.Client;

export class TxSmsSender {
  client = new CvmClient({
    credential: {
      secretId: process.env.TX_SMS_SECRET_ID,
      secretKey: process.env.TX_SMS_SECRET_KEY,
    },
    region: 'ap-shanghai',
    // 可选配置实例
    profile: {
      signMethod: 'TC3-HMAC-SHA256', // 签名方法
      httpProfile: {
        reqMethod: 'POST', // 请求方法
        reqTimeout: 30, // 请求超时时间，默认60s
        // proxy: "http://127.0.0.1:8899" // http请求代理
      },
    },
  });
  /**
   * 通过腾讯云发送短信
   * @param tel 手机号
   * @param code 验证码
   */
  public async sendValidCode(tel: string, code: string): Promise<boolean> {
    const params = {
      PhoneNumberSet: [`+86${tel}`],
      TemplateID: '1020',
      SmsSdkAppid: process.env.TX_SMS_SDK_APPID,
      code,
    };
    const result = await this.client.request('SendSms', params);
    console.log(result);
    return true;
  }
}
