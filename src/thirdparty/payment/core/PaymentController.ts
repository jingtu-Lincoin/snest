import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { PaymentService } from './PaymentService';
import { AlipayCallbackBean } from '../alipay/bean/AlipayCallbackBean';
import { ResultInfo } from '../../../core/bean/ResultInfo';
import { PaymentPo } from './PaymentPo';

@Controller('payment')
export class PaymentController {
  @Inject()
  paymentService: PaymentService;

  @Get('zfbCallback')
  zfbCallback(@Body() result: AlipayCallbackBean): any {
    return this.paymentService.zfbCallback(result);
  }

  @Post('detail')
  async detail(@Body() po: PaymentPo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.paymentService.get(po.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('getList')
  async getList(@Body() po: PaymentPo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.paymentService.getList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }
}
