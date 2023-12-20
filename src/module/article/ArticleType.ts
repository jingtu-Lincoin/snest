import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';

@Entity('t_article_type')
export class ArticleType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  code: string;
}
