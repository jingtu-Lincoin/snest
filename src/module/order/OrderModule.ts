import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './OrderController';
import { Order } from './Order';
import { OrderService } from './OrderService';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as nuid from 'nuid';
import dayjs = require('dayjs');
import * as process from 'process';
const uploadPath = 'upload';
@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
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
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
