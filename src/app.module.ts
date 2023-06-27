import { Module } from '@nestjs/common';
import { AppController } from './module/app/AppController';
import { AppService } from './module/app/AppService';
import { UserModule } from './core/user/UserModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import dayjs = require('dayjs');
import * as nuid from 'nuid';
import { GptModule } from './module/gpt/GptModule';
import { AuthModule } from './core/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GptRecord } from './module/gpt/GptRecord';
import { SmsCode } from './thirdparty/sms/core/SmsCode';
import { User } from './core/user/User';
import { SmsStat } from './thirdparty/sms/core/SmsStat';
import { Payment } from './thirdparty/payment/core/Payment';
import { PaymentModule } from "./thirdparty/payment/core/PaymentModule";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass',
      database: 'smartgpt',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, GptRecord, SmsCode, SmsStat, Payment],
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
    ScheduleModule.forRoot(),
    UserModule,
    GptModule,
    AuthModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
