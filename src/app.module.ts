import { Module } from '@nestjs/common';
import { AppController } from './module/app/AppController';
import { AppService } from './module/app/AppService';
import { UserModule } from './core/user/UserModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GptModule } from './module/gpt/GptModule';
import { AuthModule } from './core/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GptRecord } from './module/gpt/GptRecord';
import { SmsCode } from './thirdparty/sms/core/SmsCode';
import { User } from './core/user/User';
import { SmsStat } from './thirdparty/sms/core/SmsStat';
import { Payment } from './thirdparty/payment/core/Payment';
import { PaymentModule } from './thirdparty/payment/core/PaymentModule';
import { OrderModule } from './module/order/OrderModule';
import { MediaModule } from './module/media/MediaModule';
import { Media } from './module/media/Media';
import { Order } from './module/order/Order';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass',
      database: 'minishop',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, GptRecord, SmsCode, SmsStat, Payment, Order, Media],
    }),
    ScheduleModule.forRoot(),
    UserModule,
    GptModule,
    AuthModule,
    PaymentModule,
    OrderModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
