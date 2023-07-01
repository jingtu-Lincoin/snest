import { Inject, Injectable } from '@nestjs/common';
import { Payment } from './Payment';
import { AlipayCallbackBean } from '../alipay/bean/AlipayCallbackBean';
import { PaymentPo } from './PaymentPo';
import { Page } from '../../../core/bean/Page';
import Util from '../../../util/Util';

@Injectable()
export class PaymentService {
  async getList(po: PaymentPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = Payment.createQueryBuilder('payment');
    if (po.outTradeNo) {
      query.where('payment.outTradeNo like :outTradeNo', {
        outTradeNo: `%${po.outTradeNo}%`,
      });
    }
    query.skip((po.page - 1) * po.pageSize);
    query.take(po.pageSize);
    const result = query.getManyAndCount();
    await result.then((value) => {
      page.list = value[0];
      page.pageCount = Util.getPageCount(value[1], po.pageSize);
    });
    return page;
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

  async get(id: number) {
    return Payment.findOne({
      where: {
        id: id,
      },
    });
  }
}
