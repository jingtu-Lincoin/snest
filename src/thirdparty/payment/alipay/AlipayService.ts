import { Inject, Injectable } from '@nestjs/common';
import AlipaySdk, { AlipaySdkCommonResult } from 'alipay-sdk';
import { randomBytes } from 'crypto';
import { PaymentService } from '../core/PaymentService';
export class AlipayService {
  private alipaySdk: AlipaySdk;
  paymentService: PaymentService = new PaymentService();
  private returnUrl = 'http://www.mockmock.cn/#/paySuccess';

  public initSdk() {
    this.alipaySdk = new AlipaySdk({
      appId: '2021004101646999',
      alipayPublicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlRik3uYpNRcT6y19LBlmnMLTS9iW8PIM8CA316vy6mRGwyYJYBdoFgRRJoWiWOFsPP0OJcmGF5WQj6Zc9f9X2L1hFSbuAlcZBiTaEMgXzzS9k06m7zrVMVlBT4LHJDSJt09EjNx/cp9TZzc1KUc6r/S+yQ4IOWJiPg5WShJ2rQUHJnRCVVIZsvootKEmhODm+s7D2ddt2croXtac+l8rAOtrEntQrI54iU/Ac+XoaAS9FwZlZtr6gGwthubSTH5UoMTFAsAB9/Y8lQfw/RYOdE7oSQbXeRM2Zb7jNxBZP6HRn1x/fGl/9AuUTTTlr944cxwSITaWU4pK98yeTqO4EwIDAQAB',
      privateKey:
        'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCW2GWlz8h58CL7jmNZ0SggybVgoIHSH+yWpZ6d+L+uo1edQZFrJQEQxOYEyjHADWsqykAdTpFvvRQQQTzCvKNF/fgLIS5wDSS1QCTiKcWD8lJQXyuWNumWLf7ZytmNqiCEpeeC32tNM/ClsOv6CkpWW5eFOnJrV0wnnc7fCZFM0iIEx1Y0NsAoixqzb1UvHdPQSEUf2jZTWNZR7+t6Th0dow6+JV2awthp5bLFg4asNDGy2VIfUddNch0PjjDq60i2d9on3lFrJO0JOfMT0kuX+ZTexWGBPUZTf/uYZ7EK5E72+MXWlmhyYtAKFJOkd1EBnunz3+G10ZEJp1UbZ/wzAgMBAAECggEBAIMbvu2pdbQWdjFzBwNP+bLV3uIHYA7EVJxzgzQGuoQN0N8L2FrqJMzwdoR/QVKN1zGv7J4MZfhavQ+LxEX2M2toXKk/w978bYVkJSq158jRW54jufyr6cbwX2vpFcI9tlnU4S4tBlRp6qX46oG/Y/E/VqkjrcOCctyUGvRcmn/LZPkKNsHKqATcmDiXtvIyvg81hGetU1IONeYrivWRY5u6I9ElT3v9S6upLjQyhkRQG2NEWjQyjfpsaKKYrninAamfq3q7R5gnTorYK0GSao8WJpK7qa9RlYNYjnUOoBgs1lZBbm1Dr9I/1D/5kHW93y6pCuxkCiW3AbWzQdbMPzECgYEA2fwmyiXUC1YVhlLVTZqRcCVI4/FeE6BoDw5exIUPKlMl+crx0RuTUPyz7wELfjfL3SrC4SIRotk3GPdehVAK6SP9Oy5KEaH7b3leWN9icd0fLIatTVFtf2F0xeNlEKDXVInFCWcOpHzrcK6ozS5SHmeBCezYQl+QOulPw+yTMfcCgYEAsSbSr4GxKIqjiqocCBfO4C9mOihIueMxUM2vnjGaDM65KaUGFRjwRRQY2W6ypQVPAtahQJoa1IQTTyuj6cNakeL91FQbepmJh2dTYckW346APvmtp1v1ChyqrLvdE6IyhUsOV0//k5w7BZTUv9cTQvVnAcpl+xCt7/zHh4CLeKUCgYB6ObtaP4m87YDWN13ozJFeC1nqja0NXjTatFkI4f7V4Zd6j4O1lzur/nW5vqE+HXUOxupMp/ixkhAlzJZQM8haX1afN15KssO0Bp6TQHYHmE/hfIZxwwWdlfyO9Oj3QOhcO3+ivQlly7GMFjMKET30VF7zPL0pwkGx9p5GIkGKkwKBgF5b64UIc7DAh/PoQB4fcFYBaVY49uPsm+wKYyzEBuYjhoUkHWVHb1OcLNBEImu7tCYy5JlgfEIOR6q3+AsfvzJN0h4y3qAjABpbcxJ25fQWF0F0BIdMd+z28AIp3swCbR6KqAzh06RwZw/GArxcdyoHROKzSDa+36cg4bbPRXrxAoGAcgKaYEWrtLzXzXDMOPOKi/zK/CowCHm+5a1NKk6qz84aMR6gJ2/VNx1HlykPxTuY6hCYpjhXokXygQN06fSpMg/zCBnd1gV2woHYJPBNRfgKk+N6W1I/PNTyHR4M+r0dDJoPEoA6JfNvx7bA2GEc1aDOrmH0jV+65LSvCt7jU9M=',
      gateway: 'https://openapi.alipay.com/gateway.do',
      timeout: 5000,
      camelcase: true,
      signType: 'RSA2',
    });
  }

  public async payForPc(opts: any) {
    this.initSdk();
    return await this._getPcPaymentResult(opts);
  }

  private async _getPcPaymentResult(opts: any) {
    const bizContent = {
      out_trade_no: opts.outTradeNo,
      product_code: 'FAST_INSTANT_TRADE_PAY',
      subject: opts.subject,
      body: '234',
      total_amount: opts.totalAmount / 100,
    };

    console.log('bizContent ' + JSON.stringify(bizContent));

    // 支付页面接口，返回 html 代码片段，内容为 Form 表单
    const result = this.alipaySdk.pageExec('alipay.trade.page.pay', {
      method: 'POST',
      bizContent,
      returnUrl: this.returnUrl,
    });
    console.log('result ' + JSON.stringify(result));
    return result;
  }
}
