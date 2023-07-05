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
        'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCypXU6sI4OGDfoAzRZcNB3Ob9XeMAbnLfvAOTOumIRWtxr3l05vl/1C8RC02LtKKFSbgxYkhQdXTE8fi/dDnWh3Zx4SsckDpph36XIBE+GtexGKCzq7WkwBPfk4b9MFibp7f65zqsRiM5N6xmD4i/C0Yswhz9XjkE1AtN9+UCd5EEn8PIxcvLwq9K/55C+LGcrVzjQBt7beFhADjoC56oFOa5q959jsxjvCcVU6sGW9twpU9uZxfU0xLcgNXI2THlF1QVaZD1ybw8tIhd2pfVY/53lKY39I3kAw7hsvSiJxEkcCt1i3nQoEzWuFOZaRhFtUSGR0h47a9zhDSrqpu0zAgMBAAECggEBALIsCT5upk9yYhfZUlW+CXxPsQF5oggoBt6tgoaYJ4TtnRdMYKhdsfCBOs33bBviQPsoXNHdZ4hd0ORnai9L45B7qTnkQrc4hUsGNp7FhddyC+Nw4FOyUw2cduzlJdip40e+oSYJ9F35luDpkLoTVdU1DmBpE4isjWZkmjBy7rpJKQjzDImgRHtOR+CLwlAvJBs7i8J/LpFS0ZYf+gjkNNN+Y85zuFnqTKBsPe2WKJfrxCYlyLTwen/H+0cPH0hDXpFFGLatuqCUaSMG/vU0/NuzUEyk/svh/WBoEHLV5Ahm/6LCjM8TBSk3ZVRz+2QEHMVh0txzhoeeV/HwFUyLqCECgYEA1wsI/zv2k2PS/RFCXoUMn4HK/yOqNIaX1enClns3Q34E4Q3doRSjuWgQFXsD1+Av2WQ1nGcIgj24IvykaPZvXKcVzsicwc5/2sAxw4vd5fCg7k8pxWk2twtN31Pm/ScAoZwft92vC6euI0LCmTfv4dD9xZV6k6yJOPkhuDCSYyMCgYEA1KvObzrKZyxs6ZFBsyBKi0Vc3q3Ttre97w/TdCbNr5njNezrqDE6kCwgbK2t8Qik+bMTHtMjqJkIkF36G+oXfz7BrkDiX4Gc+SNvheNZF1oM1kYvjWsRXG902ZFBNNneHFceY5R/7a4ocOZSHCk+WbdI+7sFAs4Aa3d/coFNNrECgYBJZ5/rmClkSIgGELUqFJqpfCGyFBeOlH8R6xicS3Ui2cqKlDQaPzRgHrCW1IYMU5+hwn42ZElYQ/8uGjV5Ct4ar4JXMs2nrnigUEjsajsVuZ0FnAozM+YUd4xedoJ72atyfxuopMiS3usnaCuLJ7f/ylpF7u+Hpza0Nv6WpCXkJwKBgGqbRPwU6GkXp/DdU6XLRhLSTl+Bm2M4cAlqUYEkAm9IINFjVi4Vn1muBQL1fQAaaTiSP79v76wQKm7T7RAZJHYwqz4CYHenrVxmGv1unbZK+axfum6VgTpo1JZLbfhkTia+tQkN46LtbnBJxFdBhXPLoNYvRa/GPAei+0wW7PHBAoGBAI3Ekvmo3AauzFG/UD1D9ONr0rL1QHu85qubT1j9fFey0X09qjB0rQ87iFWvG0w19H6cvmryyuJjGb5EB0LNcDb/OQ4ZvwGZvB2aCGcOq3P9gqadupp+wKhmKV3Dk++KSNQwHZaZzYcfeHKWvHDCnF6fzHJedOJhruHCeTn3l1Kk',
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
