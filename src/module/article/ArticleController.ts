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
import { ArticleService } from './ArticleService';
import { Article } from './Article';
import { ArticlePo } from './ArticlePo';

@Controller('articleApi')
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService) {}
  @Post('getPageList')
  async getList(@Body() po: ArticlePo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.ArticleService.getList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('add')
  async add(@Body() Article: Article): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(Article));
    const info = new ResultInfo();
    try {
      info.data = await this.ArticleService.add(Article);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('remove')
  async remove(@Body() Article: Article): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(Article));
    const info = new ResultInfo();
    try {
      info.data = await this.ArticleService.remove(Article.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('detail')
  async detail(@Body() Article: Article): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(Article));
    const info = new ResultInfo();
    try {
      info.data = await this.ArticleService.get(Article.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }
}
