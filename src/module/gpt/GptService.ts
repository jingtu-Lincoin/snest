import { Injectable } from '@nestjs/common';
import UploadResult from '../../thirdparty/file/UploadResult';
import FileParser from '../../thirdparty/file/FileParser';

@Injectable()
export class GptService {
  async uploadFile(file: Express.Multer.File): Promise<UploadResult> {
    const result = new UploadResult();
    const text = await FileParser.readText(file);
    console.log('text', text);
    result.message = text;

    return result;
  }
}
