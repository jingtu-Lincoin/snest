import { Injectable } from '@nestjs/common';
import UploadResult from '../../thirdparty/file/UploadResult';

@Injectable()
export class FileService {
  uploadFile(file: Express.Multer.File): UploadResult {
    console.log('file ' + file.path + ' originalname ' + file.originalname);
    const info = new UploadResult();
    const httpUrl = 'http://localhost:3000';
    info.fileUrl = httpUrl + file.path;
    info.fileUrl = info.fileUrl.replace('/public', ''); // 去掉/public
    return info;
  }
}
