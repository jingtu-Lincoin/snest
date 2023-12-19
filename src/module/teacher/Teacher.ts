import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@Entity('t_teacher')
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  userHead: string;
  @Column({ nullable: true })
  ctime: string;
  @Column({ nullable: true })
  des: string; //介绍
  @Column({ nullable: true })
  department: string; //部门
  @Column({ nullable: true })
  code: string; //工号

}
