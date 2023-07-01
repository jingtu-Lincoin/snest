import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

/**
 * 用于存储gpt生成记录的实体类
 */
@Entity('t_gpt_record')
export class GptRecord extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column({ nullable: true })
  userName: string;
  @Column({ nullable: true })
  tel: string;
  @Column({ nullable: true })
  ctime: string;
  @Column({ nullable: true })
  filePath: string; //上传的文件保存的路径
  @Column({ nullable: true })
  fileName: string; //上传的文件名
  @Column({ nullable: true })
  content: string; //gpt生成的内容
  @Column({ nullable: true })
  origin: string; //原始内容
}
