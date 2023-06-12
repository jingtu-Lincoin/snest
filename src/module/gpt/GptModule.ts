import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GptController } from './GptController';
import { GptService } from './GptService';

@Module({
  controllers: [GptController],
  providers: [GptService],
})
export class GptModule {}
