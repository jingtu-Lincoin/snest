import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageBoardController } from './MessageBoardController';
import { MessageBoardService } from './MessageBoardService';
import { MessageBoard } from './MessageBoard';
@Module({
  imports: [TypeOrmModule.forFeature([MessageBoard])],
  controllers: [MessageBoardController],
  providers: [MessageBoardService],
})
export class MessageBoardModule {}
