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
      appId: '2021003199675639',
      //支付宝公钥，查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
      alipayPublicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlRik3uYpNRcT6y19LBlmnMLTS9iW8PIM8CA316vy6mRGwyYJYBdoFgRRJoWiWOFsPP0OJcmGF5WQj6Zc9f9X2L1hFSbuAlcZBiTaEMgXzzS9k06m7zrVMVlBT4LHJDSJt09EjNx/cp9TZzc1KUc6r/S+yQ4IOWJiPg5WShJ2rQUHJnRCVVIZsvootKEmhODm+s7D2ddt2croXtac+l8rAOtrEntQrI54iU/Ac+XoaAS9FwZlZtr6gGwthubSTH5UoMTFAsAB9/Y8lQfw/RYOdE7oSQbXeRM2Zb7jNxBZP6HRn1x/fGl/9AuUTTTlr944cxwSITaWU4pK98yeTqO4EwIDAQAB',
      //应用私钥，查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的应用私钥。
      privateKey:
        'MIIEpAIBAAKCAQEAsqV1OrCODhg36AM0WXDQdzm/V3jAG5y37wDkzrpiEVrca95dOb5f9QvEQtNi7SihUm4MWJIUHV0xPH4v3Q51od2ceErHJA6aYd+lyARPhrXsRigs6u1pMAT35OG/TBYm6e3+uc6rEYjOTesZg+IvwtGLMIc/V45BNQLTfflAneRBJ/DyMXLy8KvSv+eQvixnK1c40Abe23hYQA46AueqBTmuavefY7MY7wnFVOrBlvbcKVPbmcX1NMS3IDVyNkx5RdUFWmQ9cm8PLSIXdqX1WP+d5SmN/SN5AMO4bL0oicRJHArdYt50KBM1rhTmWkYRbVEhkdIeO2vc4Q0q6qbtMwIDAQABAoIBAQCyLAk+bqZPcmIX2VJVvgl8T7EBeaIIKAberYKGmCeE7Z0XTGCoXbHwgTrN92wb4kD7KFzR3WeIXdDkZ2ovS+OQe6k55EK3OIVLBjaexYXXcgvjcOBTslMNnHbs5SXYqeNHvqEmCfRd+Zbg6ZC6E1XVNQ5gaROIrI1mZJowcu66SSkI8wyJoER7Tkfgi8JQLyQbO4vCfy6RUtGWH/oI5DTTfmPOc7hZ6kygbD3tliiX68QmJci08Hp/x/tHDx9IQ16RRRi2rbqglGkjBv71NPzbs1BMpP7L4f1gaBBy1eQIZv+iwozPEwUpN2VUc/tkBBzFYdLcc4aHnlfx8BVMi6ghAoGBANcLCP879pNj0v0RQl6FDJ+Byv8jqjSGl9XpwpZ7N0N+BOEN3aEUo7loEBV7A9fgL9lkNZxnCII9uCL8pGj2b1ynFc7InMHOf9rAMcOL3eXwoO5PKcVpNrcLTd9T5v0nAKGcH7fdrwunriNCwpk37+HQ/cWVepOsiTj5IbgwkmMjAoGBANSrzm86ymcsbOmRQbMgSotFXN6t07a3ve8P03Qmza+Z4zXs66gxOpAsIGytrfEIpPmzEx7TI6iZCJBd+hvqF38+wa5A4l+BnPkjb4XjWRdaDNZGL41rEVxvdNmRQTTZ3hxXHmOUf+2uKHDmUhwpPlm3SPu7BQLOAGt3f3KBTTaxAoGASWef65gpZEiIBhC1KhSaqXwhshQXjpR/EesYnEt1ItnKipQ0Gj80YB6wltSGDFOfocJ+NmRJWEP/Lho1eQreGq+CVzLNp654oFBI7Go7FbmdBZwKMzPmFHeMXnaCe9mrcn8bqKTIkt7rJ2griye3/8paRe7vh6c2tDb+lqQl5CcCgYBqm0T8FOhpF6fw3VOly0YS0k5fgZtjOHAJalGBJAJvSCDRY1YuFZ9ZrgUC9X0AGmk4kj+/b++sECpu0+0QGSR2MKs+AmB3p61cZhr9bp22SvmsX7pulYE6aNSWS234ZE4mvrUJDeOi7W5wScRXQYVzy6DWL0WvxjwHovtMFuzxwQKBgQCNxJL5qNwGrsxRv1A9Q/Tja9Ky9UB7vOarm09Y/XxXstF9PaowdK0PO4hVrxtMNfR+nL5q8sriYxm+RAdCzXA2/zkOGb8BmbwdmghnDqtz/YKmnbqafsCoZildw5PvikjUMB2Wmc2HH3hylrxwwpxen8xyXnTiYa7hwnk595dSpA==',
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
