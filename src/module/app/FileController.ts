import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './FileService';
import { OrderPo } from "../order/OrderPo";
import UploadParam from "../../thirdparty/file/UploadParam";

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(@UploadedFile() file: Express.Multer.File,@Body() po: UploadParam) {
    return this.fileService.uploadFile(file, po);
  }
}
