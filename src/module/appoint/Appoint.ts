import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@Entity('t_appoint')
export class Appoint extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  tel: string;
  @Column({ nullable: true })
  userHead: string;
  @Column({ nullable: true })
  ctime: string;
  @Column({ nullable: true})
  teacherId: string;
  @Column({ nullable: true})
  teacherName: string;
  @Column({ nullable: true })
  teacherHead: string;
  @Column({ nullable: true })
  appointTime: string;
}
