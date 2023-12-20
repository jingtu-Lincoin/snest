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
import { StudentService } from './StudentService';
import { Student } from './Student';
import { StudentPo } from './StudentPo';

@Controller('studentApi')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post('getPageList')
  async getList(@Body() po: StudentPo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.studentService.getList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('add')
  async add(@Body() student: Student): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(student));
    const info = new ResultInfo();
    try {
      info.data = await this.studentService.add(student);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('operate')
  async remove(@Body() student: Student): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(student));
    const info = new ResultInfo();
    try {
      info.data = await this.studentService.remove(student.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('detail')
  async detail(@Body() student: Student): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(student));
    const info = new ResultInfo();
    try {
      info.data = await this.studentService.get(student.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }
}
