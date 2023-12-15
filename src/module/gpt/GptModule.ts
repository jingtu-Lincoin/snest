import { Module } from '@nestjs/common';
import { GptController } from './GptController';
import { GptService } from './GptService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GptRecord } from './GptRecord';
import { UserService } from '../../core/user/UserService';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as nuid from 'nuid';
import dayjs = require('dayjs');
import * as process from 'process';
import { ScheduleModule } from '@nestjs/schedule';
import { GptTask } from './GptTask';
const uploadPath = process.env.FILE_UPLOAD_PATH || 'upload';

@Module({
  imports: [
    TypeOrmModule.forFeature([GptRecord]),
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: uploadPath + `/${dayjs().format('YYYY-MM-DD')}`,
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [GptController],
  providers: [GptService, UserService, GptTask],
})
export class GptModule {}
