import { Module } from '@nestjs/common';
import { AppController } from './module/app/AppController';
import { AppService } from './module/app/AppService';
import { UsersModule } from './module/user/UsersModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import dayjs = require('dayjs');
import * as nuid from 'nuid';
import {GptModule} from "./module/gpt/GptModule";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass',
      database: 'test',
      autoLoadEntities: true
    }),
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: `D:\\test\\upload/${dayjs().format('YYYY-MM-DD')}`,
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
    UsersModule,
    GptModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
