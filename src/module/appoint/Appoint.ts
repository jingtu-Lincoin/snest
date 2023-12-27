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
  studentId: number;
  @Column({ nullable: true })
  studentName: string;
  @Column({ nullable: true })
  studentPhone: string;
  @Column({ nullable: true })
  studentHead: string;
  @Column({ nullable: true })
  ctime: string;
  @Column({ nullable: true})
  teacherId: number;
  @Column({ nullable: true})
  teacherName: string;
  @Column({ nullable: true })
  teacherHead: string;
  @Column({ nullable: true })
  appointDate: string;
  @Column({ nullable: true })
  appointType: string;
}
