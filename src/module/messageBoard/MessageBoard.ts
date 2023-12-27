import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@Entity('t_message_board')
export class MessageBoard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  code: string;
  @Column({ nullable: true })
  tel: string;
  @Column({ nullable: true })
  userHead: string;
  @Column({ nullable: true })
  ctime: string;
  @Column({ nullable: true })
  title: string;
  @Column({ nullable: true })
  content: string;
  @Column({ nullable: true })
  status: string; //1已回复 2未回复
  @Column({ nullable: true })
  replyContent: string;
}
