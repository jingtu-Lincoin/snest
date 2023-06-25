import { Module } from '@nestjs/common';
import { GptController } from './GptController';
import { GptService } from './GptService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GptRecord } from './GptRecord';

@Module({
  imports: [TypeOrmModule.forFeature([GptRecord])],
  controllers: [GptController],
  providers: [GptService],
})
export class GptModule {}
