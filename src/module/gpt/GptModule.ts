import { Module } from '@nestjs/common';
import { GptController } from './GptController';
import { GptService } from './GptService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GptRecord } from './GptRecord';
import { UserService } from '../../core/user/UserService';

@Module({
  imports: [TypeOrmModule.forFeature([GptRecord])],
  controllers: [GptController],
  providers: [GptService, UserService],
})
export class GptModule {}
