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
      privateKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlRik3uYpNRcT6y19LBlmnMLTS9iW8PIM8CA316vy6mRGwyYJYBdoFgRRJoWiWOFsPP0OJcmGF5WQj6Zc9f9X2L1hFSbuAlcZBiTaEMgXzzS9k06m7zrVMVlBT4LHJDSJt09EjNx/cp9TZzc1KUc6r/S+yQ4IOWJiPg5WShJ2rQUHJnRCVVIZsvootKEmhODm+s7D2ddt2croXtac+l8rAOtrEntQrI54iU/Ac+XoaAS9FwZlZtr6gGwthubSTH5UoMTFAsAB9/Y8lQfw/RYOdE7oSQbXeRM2Zb7jNxBZP6HRn1x/fGl/9AuUTTTlr944cxwSITaWU4pK98yeTqO4EwIDAQAB',
      alipayPublicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnOk6Zje0J8WPERzzkpQG1PE/vZNul+RSJleefmUQgbFJE5aT9aIYj1fgoTXDxoFmxApjkduZVFZCTLBbpgf5QBp8N/yT5UAXfObGZXGfJvO1ttM+yABQAUnkAgg7x8a8CM6J3QDyNXreMOFs9r/edAUaVGBgYrTUdS5TVdKHA6KPQUWHwKVloznxg48SAU7vVCV+CJhHB1JlLSzFeM1b/lkroWu0wsHzzdtai26BaSXYN7/I/hPTDho6VigAITSYyWXNnuGmjswCydCOuZTqnNlyrh7DOAc+WUayWJvi/7S38dceRoKkIGd0qudx8YuTDAWYz9VHQTBdhSbZNzGK0QIDAQAB',
      gateway: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do',
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
