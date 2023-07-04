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
      alipayPublicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlRik3uYpNRcT6y19LBlmnMLTS9iW8PIM8CA316vy6mRGwyYJYBdoFgRRJoWiWOFsPP0OJcmGF5WQj6Zc9f9X2L1hFSbuAlcZBiTaEMgXzzS9k06m7zrVMVlBT4LHJDSJt09EjNx/cp9TZzc1KUc6r/S+yQ4IOWJiPg5WShJ2rQUHJnRCVVIZsvootKEmhODm+s7D2ddt2croXtac+l8rAOtrEntQrI54iU/Ac+XoaAS9FwZlZtr6gGwthubSTH5UoMTFAsAB9/Y8lQfw/RYOdE7oSQbXeRM2Zb7jNxBZP6HRn1x/fGl/9AuUTTTlr944cxwSITaWU4pK98yeTqO4EwIDAQAB',
      privateKey:
        'MIIEpAIBAAKCAQEApmQuLtexkIt+G+u/mvrJ6QsNG+O4ng7vu50HXovSH8QkKoQfIGH73LHsUL6u46M7xITPpj23UHDKdac6iRsZ5yT3byb1WcENPTsOnJ9vL9dcRoYWWlAzylMUa4EwJsQqnrgKfulC73A4gaVuVjuX+OfSqnanX5kYwCwFt/lffoq/wxkHbyLRtpL4grlbZ3BhN18pOFe64JCXo1awtDyK1mcCM2ezR+bZ4wHiCnndWPoF6x7j+QGXKJx/gkSV79jLYaWkRt5kfhwcz9HhuLfYaQue1Ox/kj7FY5Z5vcPUdYQqlnd8Jfu5FCG+WCoi1KVEqaPA77S7Kwj5oMoMNWe0vQIDAQABAoIBACQUhxsrNFq2lMLzLNorVYsOFWqdx5Omg394PnfW89plir4ZZjJ8bMPfZPHhV0UPSU+EyQ4wRcbQnmZCu+OtF8HSd0EH/p3WycskOjfmLpL+LQkx3Dj7OS+/MidZnRpa4S8Hk2cPp68J84bRW4qhY4PaqQjDr+l/5ikNorPRBE8I5kKJ3VTHq6/PJ5HgMs97OtJtrdvRRbK1dwiTrM8BjzZqhljOBIkcEanHjAi2yotCXqXb/9IOjtrAyTvZD35hmsBmxR1EsOZP8bLXGz0E6W1hHytOLa+3PEzCTyuiPnJbl8em5CHixiE2k+y2YC6FgvHtLjMjDljNl+hbbcn8ziECgYEA9jei9+uJ2ehPLelWFRVXL2TdYtGNw2vYafZPt1haVH0rWGH1vh1NHBb+1HBLE46V0VhLlGxgFg/AnHWmudFCPBc5u1sNXGkZmXsXhpN2tpeW4rH6zU7bvllL2a+28SMuhe3C4rm+i/BnJ+spWt1coZu+lJgKTY8Njii+Yg/D5NkCgYEArQCa+VzrxVt2jHMX/7qP5x+d49iHQC3+IduZZ5f48Tp8zpjkV4DzJmh/Y/5mJCrAQnn0Q7aGbjZtPmyJesfdrW2qe2BDkBt6z84hFvWfRC8euaSRclCOftpTojMZHkDXjynkLcGAfsMft4fbWXf2/PSQoVbL482YJg+hDctOUIUCgYAxe376GlErBQActv9A33gVI01G1dyKwLrOmNzueQg2YK18ZruPiK39jjWKlkLQXGCJoRgXbSxmYqYQC6kFQSPxla1ZlPP7dXfam51fw3UhPxfo2WIRLt8Ew0d2KVU34x0vd1gqXrAHybnBkQZPp5s9M2K61E+FxNExl8ijRo3VCQKBgQCXMfw/CtKTPQgyXzQOL0IswBkBU++AS7HabU14l/zc9jy1YjHNt8jJPHJ5NZCW8zXr4yFzPEXodHCtKbZNM/es5jckdFEX1KxUiNWqdyemM3gqzoS+32BpxO1qyDWflxPM7tOYmZBvOKCziWxOmOWm1SbBmlW+1aOvP+GFaLUc8QKBgQCS1fBqywdI+gWXDRBV1bhyARIITMiEWEaOR4Mqi/WVMEmjbug9AGEom3+G8vzMrxh3Bd2ayD3/M2NT87GjZ7fpW9HlwHDDjobjMUO6/uJe4WgPnmGl9wVj0gCD1RKSiElqi1AcUOr2MGRQEd0xnNkgw2y5FDmLCmyYbD01baSj9g==',
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
