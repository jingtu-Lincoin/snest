import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ResultInfo } from '../../core/bean/ResultInfo';
import { Order } from './Order';
import { OrderService } from './OrderService';
import { OrderPo } from './OrderPo';
import { FileInterceptor } from "@nestjs/platform-express";
import { GptPo } from "../gpt/GptPo";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('getList')
  async getList(@Body() po: OrderPo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.orderService.getList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('add')
  async add(@Body() order: Order): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(order));
    const info = new ResultInfo();
    try {
      info.data = await this.orderService.add(order);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('remove')
  async remove(@Body() order: Order): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(order));
    const info = new ResultInfo();
    try {
      info.data = await this.orderService.remove(order.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('detail')
  async detail(@Body() order: Order): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(order));
    const info = new ResultInfo();
    try {
      info.data = await this.orderService.get(order.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async upload(@UploadedFile() file: Express.Multer.File, @Body() po: OrderPo) {
    console.log('po ' + JSON.stringify(po));
    return this.orderService.upload(file, po);
  }

  @Post('createUserOrder')
  async createUserOrder(@Body() po: OrderPo): Promise<ResultInfo> {
    const info = new ResultInfo();
    try {
      info.data = await this.orderService.createUserOrder(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }
}
