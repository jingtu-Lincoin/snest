import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResultInfo } from '../../core/bean/ResultInfo';
import { AppointService } from './AppointService';
import { Appoint } from './Appoint';
import { AppointPo } from './AppointPo';

@Controller('appointApi')
export class AppointController {
  constructor(private readonly appointService: AppointService) {}
  @Post('getPageList')
  async getList(@Body() po: AppointPo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.appointService.getList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('add')
  async add(@Body() Appoint: Appoint): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(Appoint));
    const info = new ResultInfo();
    try {
      info.data = await this.appointService.add(Appoint);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('remove')
  async remove(@Body() Appoint: Appoint): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(Appoint));
    const info = new ResultInfo();
    try {
      info.data = await this.appointService.remove(Appoint.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('detail')
  async detail(@Body() Appoint: Appoint): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(Appoint));
    const info = new ResultInfo();
    try {
      info.data = await this.appointService.get(Appoint.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('getUserAppoints')
  async getUserAppoints(@Body() po: AppointPo): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(Appoint));
    const info = new ResultInfo();
    try {
      info.data = await this.appointService.getUserAppoints(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }
}
