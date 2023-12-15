import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GptService } from './GptService';
import { ResultInfo } from '../../core/bean/ResultInfo';
import { GptPo } from './GptPo';
import { User } from "../../core/user/User";

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async upload(@UploadedFile() file: Express.Multer.File, @Body() user: User) {
    console.log('po ' + JSON.stringify(user));
    return this.gptService.upload(file, user);
  }

  @Post('getList')
  async getList(@Body() po: GptPo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.gptService.getList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('loadGptData')
  async loadGptData(@Body() po: GptPo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.gptService.loadGptData(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }
}
