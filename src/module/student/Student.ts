import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@Entity('t_student')
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  tel: string;
  @Column({ nullable: true })
  code: string;
  @Column({ nullable: true })
  userHead: string;
  @Column({ nullable: true })
  ctime: string;
  @Column({ nullable: true })
  password: string;
}
