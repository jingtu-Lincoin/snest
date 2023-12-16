import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@Entity('t_article')
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  tel: string;
  @Column({ nullable: true })
  topImage: string;
  @Column({ nullable: true })
  ctime: string;
  @Column({ nullable: true })
  status: string; // 3未冲洗,4已冲洗
}