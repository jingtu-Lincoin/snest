import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@Entity('t_media')
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  userId: number;
  @Column({ nullable: true })
  userName: string;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  path: string; // 上传后的路径,相对路径
  @Column({ nullable: true })
  url: string; // 上传后的url，用于页面展示
  @Column({ nullable: true })
  ctime: string;
  @Column({ nullable: true })
  size: number;
  @Column({ nullable: true })
  type: string;
  @Column({ nullable: true })
  bid: number;
  @Column({ nullable: true })
  bcode: string;
  @Column({ nullable: true })
  bname: string;

}
