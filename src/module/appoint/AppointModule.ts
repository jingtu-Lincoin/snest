import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointController } from './AppointController';
import { AppointService } from './AppointService';
import { Appoint } from './Appoint';
@Module({
  imports: [TypeOrmModule.forFeature([Appoint])],
  controllers: [AppointController],
  providers: [AppointService],
})
export class AppointModule {}
