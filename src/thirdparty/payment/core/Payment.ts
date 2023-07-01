import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';

/**\
 * 通用的支付记录表
 */
@Entity('t_payment')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 支付类型
   */
  @Column()
  outTradeNo: string;
  @Column({ nullable: true })
  tradeNo: string;
  @Column()
  totalAmount: number;
  @Column({ nullable: true })
  ctime: string;
  @Column({ nullable: true })
  bid: number;
  @Column({ nullable: true })
  bcode: string;
  @Column({ nullable: true })
  bname: string;
  /**
   * 支付状态,1未支付，2已支付
   */
  @Column({ nullable: true })
  payStatus: string;
  @Column({ nullable: true })
  payTime: string;
  @Column({ nullable: true })
  userId: number;
  @Column({ nullable: true })
  userName: string;
  @Column({ nullable: true })
  channel: string; //支付渠道,alipay支付宝,wxpay微信
}
