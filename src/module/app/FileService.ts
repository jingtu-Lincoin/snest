import { Injectable } from '@nestjs/common';
import UploadResult from '../../thirdparty/file/UploadResult';

@Injectable()
export class FileService {
  uploadFile(file: Express.Multer.File): UploadResult {
    const result = new UploadResult();

    return result;
  }
}
