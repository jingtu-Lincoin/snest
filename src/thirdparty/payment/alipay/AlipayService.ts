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
      //支付宝公钥，查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
      alipayPublicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlRik3uYpNRcT6y19LBlmnMLTS9iW8PIM8CA316vy6mRGwyYJYBdoFgRRJoWiWOFsPP0OJcmGF5WQj6Zc9f9X2L1hFSbuAlcZBiTaEMgXzzS9k06m7zrVMVlBT4LHJDSJt09EjNx/cp9TZzc1KUc6r/S+yQ4IOWJiPg5WShJ2rQUHJnRCVVIZsvootKEmhODm+s7D2ddt2croXtac+l8rAOtrEntQrI54iU/Ac+XoaAS9FwZlZtr6gGwthubSTH5UoMTFAsAB9/Y8lQfw/RYOdE7oSQbXeRM2Zb7jNxBZP6HRn1x/fGl/9AuUTTTlr944cxwSITaWU4pK98yeTqO4EwIDAQAB',
      //应用私钥，查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的应用私钥。
      privateKey:
        'MIIEowIBAAKCAQEAlthlpc/IefAi+45jWdEoIMm1YKCB0h/slqWenfi/rqNXnUGRayUBEMTmBMoxwA1rKspAHU6Rb70UEEE8wryjRf34CyEucA0ktUAk4inFg/JSUF8rljbpli3+2crZjaoghKXngt9rTTPwpbDr+gpKVluXhTpya1dMJ53O3wmRTNIiBMdWNDbAKIsas29VLx3T0EhFH9o2U1jWUe/rek4dHaMOviVdmsLYaeWyxYOGrDQxstlSH1HXTXIdD44w6utItnfaJ95RayTtCTnzE9JLl/mU3sVhgT1GU3/7mGexCuRO9vjF1pZocmLQChSTpHdRAZ7p89/htdGRCadVG2f8MwIDAQABAoIBAQCDG77tqXW0FnYxcwcDT/my1d7iB2AOxFScc4M0BrqEDdDfC9ha6iTM8HaEf0FSjdcxr+yeDGX4Wr0Pi8RF9jNraFypP8Pe/G2FZCUqtefI0VueI7n8q+nG8F9r6RXCPbZZ1OEuLQZUaeql+OqBv2PxP1apI63DgnLclBr0XJp/y2T5CjbByqgE3Jg4l7byMr4PNYRnrVNSDjXmK4r1kWObuiPRJU97/UurqS40MoZEUBtjRFo0Mo36bGiimK54pwGpn6t6u0eYJ06K2CtBkmqPFiaSu6mvUZWDWI51DqAYLNZWQW5tQ6/SP9Q/+ZB1vd8uqQrsZAoltwG1s0HWzD8xAoGBANn8Jsol1AtWFYZS1U2akXAlSOPxXhOgaA8OXsSFDypTJfnK8dEbk1D8s+8BC343y90qwuEiEaLZNxj3XoVQCukj/TsuShGh+295XljfYnHdHyyGrU1RbX9hdMXjZRCg11SJxQlnDqR863CuqM0uUh5ngQns2EJfkDrpT8PskzH3AoGBALEm0q+BsSiKo4qqHAgXzuAvZjooSLnjMVDNr54xmgzOuSmlBhUY8EUUGNlusqUFTwLWoUCaGtSEE08ro+nDWpHi/dRUG3qZiYdnU2HJFt+OgD75radb9Qocqqy73ROiMoVLDldP/5OcOwWU1L/XE0L1ZwHKZfsQre/8x4eAi3ilAoGAejm7Wj+JvO2A1jdd6MyRXgtZ6o2tDV402rRZCOH+1eGXeo+DtZc7q/51ub6hPh11DsbqTKf4sZIQJcyWUDPIWl9WnzdeSrLDtAaek0B2B5hP4XyGccMFnZX8jvTo90DoXDt/or0JZcuxjBYzChE99FRe8zy9KcJBsfaeRiJBipMCgYBeW+uFCHOwwIfz6EAeH3BWAWlWOPbj7JvsCmMsxAbmI4aFJB1lR29TnCzQRCJru7QmMuSZYHxCDkeqt/gLH78yTdIeMt6gIwAaW3MSduX0FhdBdASHTHfs9vACKd7MAm0eiqgM4dOkcGcPxgK8XHcqB0Tis0g2vt+nIOG2z0V68QKBgHICmmBFq7S8181wzDjziov8yvwqMAh5vuWtTSpOqs/OGjEeoCdv1TcdR5cpD8U7mOoQmKY4V6JF8oEDdOn0qTIP8wgZ3dYFdsKB2CTwTUX4CpPjeltSPzzU8h0eDPq9HQyaDxKAOiXzb8e2wNhhHNWgzq5h9I1fuuS0rwre41PT',
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
