import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTypeController } from './ArticleTypeController';
import { ArticleTypeService } from './ArticleTypeService';
import { ArticleType } from './ArticleType';
@Module({
  imports: [TypeOrmModule.forFeature([ArticleType])],
  controllers: [ArticleTypeController],
  providers: [ArticleTypeService],
})
export class ArticleTypeModule {}
