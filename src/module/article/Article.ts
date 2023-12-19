import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';

@Entity('t_article')
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  title: string;
  @Column({ nullable: true })
  content: string;
  @Column({ nullable: true })
  type: string;
  @Column({ nullable: true })
  ctime: string;
}
