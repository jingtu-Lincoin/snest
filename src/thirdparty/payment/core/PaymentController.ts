import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './PaymentService';
import { AlipayCallbackBean } from '../alipay/bean/AlipayCallbackBean';

@Controller('payment')
export class PaymentController {
  @Inject()
  paymentService: PaymentService;

  @Get('zfbCallback')
  zfbCallback(@Body() result: AlipayCallbackBean): any {
    return this.paymentService.zfbCallback(result);
  }
}
