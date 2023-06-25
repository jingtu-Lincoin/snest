import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@Entity('t_user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  age: number;
  @Column({ nullable: true })
  tel: string;
  @Column({ nullable: true })
  password: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  level: string; //用户等级,0:普通用户,1:充值用户
  @Column({ nullable: true })
  credits: number; //积分
  @Column({ nullable: true })
  lastLoginTime: string; //最后登录时间
  @Column({ nullable: true })
  rechargeCount: number; //充值次数
  @Column({ nullable: true })
  generateCount: number; //生成次数
  @Column({ nullable: true })
  token: string; //token
  @Column({ nullable: true })
  ctime: string; //创建时间

  validCode: string; //接收前端传过来的验证码，不保存到数据库
}
