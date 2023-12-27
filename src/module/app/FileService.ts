import { Injectable } from '@nestjs/common';
import UploadResult from '../../thirdparty/file/UploadResult';
import process from 'process';
import UploadParam from '../../thirdparty/file/UploadParam';

@Injectable()
export class FileService {
  uploadFile(file: Express.Multer.File, po: UploadParam): UploadResult {
    console.log('file ' + file.path + ' originalname ' + file.originalname);
    const httpUrl = 'http://localhost:3000/';
    const info = new UploadResult();
    info.name = file.originalname;
    info.size = file.size;
    info.type = file.mimetype;
    info.uploader = po.uploader;
    let url = httpUrl + file.path;
    url = url.replace('/public', '');
    info.path = url;
    return info;
  }
}
