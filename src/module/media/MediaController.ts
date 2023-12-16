import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResultInfo } from '../../core/bean/ResultInfo';
import { Media } from './Media';
import { MediaService } from './MediaService';
import { MediaPo } from './MediaPo';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @Post('getList')
  async getList(@Body() po: MediaPo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.mediaService.getList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('add')
  async add(@Body() media: Media): Promise<ResultInfo> {
    console.log('media ' + JSON.stringify(media));
    const info = new ResultInfo();
    try {
      info.data = await this.mediaService.add(media);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('remove')
  async remove(@Body() media: Media): Promise<ResultInfo> {
    console.log('media ' + JSON.stringify(media));
    const info = new ResultInfo();
    try {
      info.data = await this.mediaService.remove(media.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('detail')
  async detail(@Body() media: Media): Promise<ResultInfo> {
    console.log('media ' + JSON.stringify(media));
    const info = new ResultInfo();
    try {
      info.data = await this.mediaService.get(media.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }
}
