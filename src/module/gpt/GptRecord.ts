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
  @Column()
  tel: string;
  @Column()
  ctime: string;
  @Column()
  filePath: string; //上传的文件保存的路径
  @Column()
  fileName: string; //上传的文件名
  @Column()
  content: string; //gpt生成的内容
  @Column()
  origin: string; //原始内容
}
