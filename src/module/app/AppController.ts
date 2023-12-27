import {
  Body,
  Controller,
  Get, Post
} from "@nestjs/common";
import { AppService } from './AppService';
import { ResultInfo } from "../../core/bean/ResultInfo";
import { AppPo } from "./AppPo";

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('getAppData')
  async getAppData(@Body() po: AppPo): Promise<ResultInfo> {
    const info = new ResultInfo();
    try {
      info.data = await this.appService.getAppData(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }


}
