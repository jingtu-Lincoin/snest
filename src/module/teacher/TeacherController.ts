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
import { TeacherService } from './TeacherService';
import { Teacher } from './Teacher';
import { TeacherPo } from './TeacherPo';

@Controller('Teacher')
export class TeacherController {
  constructor(private readonly TeacherService: TeacherService) {}
  @Post('getList')
  async getList(@Body() po: TeacherPo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.TeacherService.getList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('add')
  async add(@Body() Teacher: Teacher): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(Teacher));
    const info = new ResultInfo();
    try {
      info.data = await this.TeacherService.add(Teacher);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('remove')
  async remove(@Body() Teacher: Teacher): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(Teacher));
    const info = new ResultInfo();
    try {
      info.data = await this.TeacherService.remove(Teacher.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('detail')
  async detail(@Body() Teacher: Teacher): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(Teacher));
    const info = new ResultInfo();
    try {
      info.data = await this.TeacherService.get(Teacher.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }
}
