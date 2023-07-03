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
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApmQuLtexkIt+G+u/mvrJ6QsNG+O4ng7vu50HXovSH8QkKoQfIGH73LHsUL6u46M7xITPpj23UHDKdac6iRsZ5yT3byb1WcENPTsOnJ9vL9dcRoYWWlAzylMUa4EwJsQqnrgKfulC73A4gaVuVjuX+OfSqnanX5kYwCwFt/lffoq/wxkHbyLRtpL4grlbZ3BhN18pOFe64JCXo1awtDyK1mcCM2ezR+bZ4wHiCnndWPoF6x7j+QGXKJx/gkSV79jLYaWkRt5kfhwcz9HhuLfYaQue1Ox/kj7FY5Z5vcPUdYQqlnd8Jfu5FCG+WCoi1KVEqaPA77S7Kwj5oMoMNWe0vQIDAQAB',
      alipayPublicKey:
        'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmZC4u17GQi34b67+a+snpCw0b47ieDu+7nQdei9IfxCQqhB8gYfvcsexQvq7jozvEhM+mPbdQcMp1pzqJGxnnJPdvJvVZwQ09Ow6cn28v11xGhhZaUDPKUxRrgTAmxCqeuAp+6ULvcDiBpW5WO5f459KqdqdfmRjALAW3+V9+ir/DGQdvItG2kviCuVtncGE3Xyk4V7rgkJejVrC0PIrWZwIzZ7NH5tnjAeIKed1Y+gXrHuP5AZconH+CRJXv2MthpaRG3mR+HBzP0eG4t9hpC57U7H+SPsVjlnm9w9R1hCqWd3wl+7kUIb5YKiLUpUSpo8DvtLsrCPmgygw1Z7S9AgMBAAECggEAJBSHGys0WraUwvMs2itViw4Vap3Hk6aDf3g+d9bz2mWKvhlmMnxsw99k8eFXRQ9JT4TJDjBFxtCeZkK7460XwdJ3QQf+ndbJyyQ6N+Yukv4tCTHcOPs5L78yJ1mdGlrhLweTZw+nrwnzhtFbiqFjg9qpCMOv6X/mKQ2is9EETwjmQondVMerr88nkeAyz3s60m2t29FFsrV3CJOszwGPNmqGWM4EiRwRqceMCLbKi0Jepdv/0g6O2sDJO9kPfmGawGbFHUSw5k/xstcbPQTpbWEfK04tr7c8TMJPK6I+cluXx6bkIeLGITaT7LZgLoWC8e0uMyMOWM2X6FttyfzOIQKBgQD2N6L364nZ6E8t6VYVFVcvZN1i0Y3Da9hp9k+3WFpUfStYYfW+HU0cFv7UcEsTjpXRWEuUbGAWD8Ccdaa50UI8Fzm7Ww1caRmZexeGk3a2l5bisfrNTtu+WUvZr7bxIy6F7cLiub6L8Gcn6yla3Vyhm76UmApNjw2OKL5iD8Pk2QKBgQCtAJr5XOvFW3aMcxf/uo/nH53j2IdALf4h25lnl/jxOnzOmORXgPMmaH9j/mYkKsBCefRDtoZuNm0+bIl6x92tbap7YEOQG3rPziEW9Z9ELx65pJFyUI5+2lOiMxkeQNePKeQtwYB+wx+3h9tZd/b89JChVsvjzZgmD6ENy05QhQKBgDF7fvoaUSsFABy2/0DfeBUjTUbV3IrAus6Y3O55CDZgrXxmu4+Irf2ONYqWQtBcYImhGBdtLGZiphALqQVBI/GVrVmU8/t1d9qbnV/DdSE/F+jZYhEu3wTDR3YpVTfjHS93WCpesAfJucGRBk+nmz0zYrrUT4XE0TGXyKNGjdUJAoGBAJcx/D8K0pM9CDJfNA4vQizAGQFT74BLsdptTXiX/Nz2PLViMc23yMk8cnk1kJbzNevjIXM8Reh0cK0ptk0z96zmNyR0URfUrFSI1ap3J6YzeCrOhL7fYGnE7WrINZ+XE8zu05iZkG84oLOJbE6Y5abVJsGaVb7Vo68/4YVotRzxAoGBAJLV8GrLB0j6BZcNEFXVuHIBEghMyIRYRo5HgyqL9ZUwSaNu6D0AYSibf4by/MyvGHcF3ZrIPf8zY1PzsaNnt+lb0eXAcMOOhuMxQ7r+4l7haA+eYaX3BWPSAIPVEpKISWqLUBxQ6vYwZFAR3TGc2SDDbLkUOYsKbJhsPTVtpKP2',
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
