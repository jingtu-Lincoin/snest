import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './Payment';
import { PaymentController } from './PaymentController';
import { PaymentService } from './PaymentService';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
