import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@Entity('t_order')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  userId: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  tel: string;
  @Column({ nullable: true })
  topImage: string;
  @Column({ nullable: true })
  ctime: string;
  @Column({ nullable: true })
  status: string;
  @Column({ nullable: true })
  price: number;
  @Column({ nullable: true })
  outTradeNo: string;
  @Column({ nullable: true })
  day: string; // 日期，格式为2021-01-01，每天只有一条数据
  @Column({ nullable: true })
  sn: string; // 订单号，格式为F，每天从1开始
  @Column({ nullable: true })
  orderIndex: number; // 订单号，每天从1开始
  @Column({ nullable: true })
  imageCount: number; // 图片数量

}
