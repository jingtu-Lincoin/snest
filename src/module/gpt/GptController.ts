import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GptService } from './GptService';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.gptService.uploadFile(file);
  }
}
