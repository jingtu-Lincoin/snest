import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

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
  @Column()
  tradeNo: string;
  @Column()
  totalAmount: number;
  @Column()
  ctime: string;
  @Column()
  bid: number;
  @Column()
  bcode: string;
  @Column()
  bname: string;
  /**
   * 支付状态,1未支付，2已支付
   */
  @Column()
  payStatus: string;
  @Column()
  payTime: string;
}
