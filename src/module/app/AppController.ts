import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './AppService';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '../user/User';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      code: 0,
    };
  }
}
