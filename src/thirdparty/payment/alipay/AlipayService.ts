import { Inject, Injectable } from '@nestjs/common';
import AlipaySdk, { AlipaySdkCommonResult } from 'alipay-sdk';
import { randomBytes } from 'crypto';
import { PaymentService } from '../core/PaymentService';
@Injectable()
class AlipayService {
  private alipaySdk: AlipaySdk;
  @Inject()
  private paymentService: PaymentService;

  public initSdk() {
    this.alipaySdk = new AlipaySdk({
      appId: '2021000122658522',
      privateKey:
        'MIIEpQIBAAKCAQEAnXu6TMSiUPYiEl1j+xv295ds4uA51Hs/P1nVZbE5rKUsCubE+QSqTOouBpUKQ/oCyI/XfW9+ZbzqbrjmB/3fjFKL/bQ+NkNfRE1GqVZ0fiPxDLEk8pcujkBevpk6nwxtqtrqWlk6ktSl6OZU0z6e30LJqVfDDCDZH3k0NiXx1II0wgpBUhf5mD+ttzOkqDPTUUl7dTrcqTJEnXVEd4ZXNuQswRpWZjiuTziD070d4rPNIj04/d3/zGEOwFGI6xZL22Ogzzv/BoQ06GzQu+MOQUFk17YeGSF/agtYURHyFk35EvscvxzWiq5dO4p1QKjdm+vL3yusLeXqgaAlIkepewIDAQABAoIBAFSgsqKiYF+FhRW9XgcJJhQzKW5Z9Hm8qWZPzh9Rt56RPDO3g04WNbYTehxLZzLUXT6OHczoZ1IgzRInBmZxBPqROW1iuLPMTJuVs004im1mvxiE8Ufz+i6zZLaj/R6PPTe9YIagwJs67tVTQW4rjpCHgXshEE2qMUN6jJY0mdoKKNA6lj2vxKd7GLmt8+nuWIDxp63m0H6cmmnJb7BvU83QyCNvjEfcGMkPnhtbXBzROW+n8mb4iXZC7WXlcz2kVM8fU09j7PpuC0CxiPF8EedvL1J8v5/a7/FFaPZtr3KxNzyfcHz7KNnX0ahGXGHaLxAIyr03onIjKF+VURzWqYECgYEA/T3e2jo1OGc1/Iy9yHLGbJhQenB0XM3eDO3g31n0G/Si9+ps3VjzTFCwDn05MGk7DrjWOVp0UWi805aV/JR+rFCX2yhns5lYQTez0j+cRAigyXU5/U7Xh37ijkaijY5OGlu9mffrt+uEMlM3Ci9HSpWWyryNVNm5P+oR9P1vOOECgYEAnzLZJKcOXcHHu0dXrqW7Tq6MOdnbBjTu8C9etbrSU++hga9axKOqAqGHx/cIk4445BZ/GinePnDPZZ9h9Ob8rHhu+QYaO//ASR/5892Dk+zgWcbpurqZLEwtHq6qm2FlbuA/QwpUvS4+OBt8Kd0C1oI2KeZXVwK4iG/TRIZtIdsCgYEAzDq6X7ozs4IhGsSSRXayqV+I/8VzQmjQXBL3mIjeAjGfwFoxY61ZwUENSxIYLf+fnjbYpTZaulDCf81gtms3YVY5sYf7Ye8YKrh2b+fW6VMgAHhmxO9xiBd/NIiojYqnWECGPwae9huc6E0OBUutrevHyUaYoEZaTL5DrxU4PmECgYEAh6899YhQrUZI5myy5c6pazFHoNL2Yz7gW2P0U+2L8DAwNijvsuNPNnjYEm2RKLox8OzfnbwLiKp7icCjK6lnt9PZuXMjDvo2t9yCHAAzcfOVb88iTJ1XibLPTfROwqnrWunT4V6/xJHSQ93hIIkXLx7B7Uo+LJHMF7U/mor8HrsCgYEArgFl83NBkJp7ncFqKt5w+DnXKDSDqSfFAUjE1hBVc1RuMIjHB4buG/aId2TIhFTOTJLKlRduNIg/B6N2PZ5QubeEVF7XA9drEp+K/16ghzePVMJThpWIpuSS2EezJFdxfAiOH9YVLfaLDjvWssGUgDv6F7j9RJoiC1q/+f6Mvgw=',
      alipayPublicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxQlsgWwrVo9PpA1rjW76ZgThVZ1JPO4ThPlqkWPIUe5HwgzVa70iVFRSTAuL/QQKIea7QRt0heILZzOTQPef9KSOD5T7t7BSSLG25ENF1VXqEZ/jp/0IwndMwULSJENkXZcBuBg86svplEQveB3logOfLe6ZabhNARCKXyRodDWopmTAuFIc5YRk+EWHjT0frMucilpFvGIFj3Q1kqcg2jiSqpgTKisgGlkKmSAxPR4m8lmMTm7JqQIVJ+f+dFI3HlqVcWov+h5f4Yh7JP6mRcaOG93cXkN2gW5IbiAvA1ZK+XHMxrbrS8slOLneNfAf7B15nDgWUBFbl0yWxlN3IQIDAQAB',
      gateway: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do',
      timeout: 5000,
      camelcase: true,
      signType: 'RSA2',
    });
  }

  public async payForPc() {
    this.initSdk();
    const outTradeNo = randomBytes(16).toString('hex');
    console.log('outTradeNo ' + outTradeNo);
    return await this._getPcPaymentResult();
  }

  private async _getPcPaymentResult() {
    const outTradeNo = randomBytes(16).toString('hex');
    const bizContent = {
      out_trade_no: 'ALIPfdf1211sdfsd12gfddsgs3',
      product_code: 'FAST_INSTANT_TRADE_PAY',
      subject: 'abc',
      body: '234',
      total_amount: '0.01',
    };

    // 支付页面接口，返回 html 代码片段，内容为 Form 表单
    const result = this.alipaySdk.pageExec('alipay.trade.page.pay', {
      method: 'POST',
      bizContent,
      returnUrl: 'https://www.taobao.com',
    });
    console.log('result ' + JSON.stringify(result));
    return result;
  }

}
