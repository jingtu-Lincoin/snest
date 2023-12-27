import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { Article } from "./Article";

@Entity('t_article_type')
export class ArticleType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  code: string;

  articles: Article[]; //该类型下的文章
}
