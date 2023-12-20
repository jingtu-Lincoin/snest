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
import { ArticleTypeService } from './ArticleTypeService';
import { ArticleType } from './ArticleType';
import { ArticleTypePo } from './ArticleTypePo';

@Controller('articleTypeApi')
export class ArticleTypeController {
  constructor(private readonly ArticleTypeService: ArticleTypeService) {}
  @Post('getPageList')
  async getPageList(@Body() po: ArticleTypePo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.ArticleTypeService.getPageList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('getList')
  async getList(@Body() po: ArticleTypePo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.ArticleTypeService.getList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('add')
  async add(@Body() ArticleType: ArticleType): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(ArticleType));
    const info = new ResultInfo();
    try {
      info.data = await this.ArticleTypeService.add(ArticleType);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('operate')
  async remove(@Body() articleType: ArticleType): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(ArticleType));
    const info = new ResultInfo();
    try {
      info.data = await this.ArticleTypeService.remove(articleType.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('detail')
  async detail(@Body() ArticleType: ArticleType): Promise<ResultInfo> {
    console.log('order ' + JSON.stringify(ArticleType));
    const info = new ResultInfo();
    try {
      info.data = await this.ArticleTypeService.get(ArticleType.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }
}
