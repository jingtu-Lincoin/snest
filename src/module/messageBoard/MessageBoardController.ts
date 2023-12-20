import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResultInfo } from '../../core/bean/ResultInfo';
import { MessageBoardService } from './MessageBoardService';
import { MessageBoard } from './MessageBoard';
import { MessageBoardPo } from './MessageBoardPo';

@Controller('messageBoardApi')
export class MessageBoardController {
  constructor(private readonly messageBoardService: MessageBoardService) {}
  @Post('getPageList')
  async getList(@Body() po: MessageBoardPo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.messageBoardService.getList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('add')
  async add(@Body() MessageBoard: MessageBoard): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(MessageBoard));
    const info = new ResultInfo();
    try {
      info.data = await this.messageBoardService.add(MessageBoard);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('operate')
  async remove(@Body() po: MessageBoardPo): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.messageBoardService.remove(po.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('detail')
  async detail(@Body() po: MessageBoardPo): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(MessageBoard));
    const info = new ResultInfo();
    try {
      info.data = await this.messageBoardService.get(po.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('reply')
  async reply(@Body() po: MessageBoardPo): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(MessageBoard));
    const info = new ResultInfo();
    try {
      info.data = await this.messageBoardService.reply(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }
}
