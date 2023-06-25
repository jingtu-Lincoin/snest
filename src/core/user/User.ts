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
  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  tel: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  level: string; //用户等级,0:普通用户,1:充值用户
  @Column()
  credit: string; //积分
  @Column()
  lastLoginTime: string; //最后登录时间
  @Column()
  rechargeCount: number; //充值次数
  @Column()
  generateCount: number; //生成次数
  @Column()
  token: string; //token
  @Column()
  ctime: string; //创建时间


  validCode: string; //接收前端传过来的验证码，不保存到数据库
}
