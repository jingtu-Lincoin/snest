import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './ArticleController';
import { ArticleService } from './ArticleService';
import { Article } from './Article';
import { ArticleTypeService } from './ArticleTypeService';
@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleTypeService],
})
export class ArticleModule {}
