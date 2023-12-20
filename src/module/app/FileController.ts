import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './FileService';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file);
  }
}
