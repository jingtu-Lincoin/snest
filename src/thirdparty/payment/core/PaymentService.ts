import { Inject, Injectable } from '@nestjs/common';
import { Payment } from './Payment';
import { AlipayCallbackBean } from '../alipay/bean/AlipayCallbackBean';

@Injectable()
export class PaymentService {
  getList(): Promise<Array<Payment>> {
    return Payment.find();
  }

  add(payment: Payment) {
    return payment.save();
  }

  async zfbCallback(result: AlipayCallbackBean) {
    console.log('zfbCallback ' + JSON.stringify(result));
    if (result.trade_status == 'TRADE_SUCCESS') {
      const payment = await Payment.findOne({
        where: { outTradeNo: result.out_trade_no },
      });
      if (payment != null) {
        payment.payStatus = '2';
        payment.tradeNo = result.trade_no;
        payment.totalAmount = parseFloat(result.total_amount) * 100;
        payment.payTime = result.gmt_payment;
        payment.save();
      }
    }
    return 'success';
  }

  async getByOutTradeNo(out_trade_no: string) {
    return Payment.findOne({
      where: { outTradeNo: out_trade_no },
    });
  }
}
