import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

/**
 * 通用的短信发送统计表
 */
@Entity('t_sms_stat')
export class SmsStat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  tel: string;
  /**
   * 发送场景,1注册，2验证密码
   */
  @Column()
  sense: number;
  /**
   * 发送日期
   */
  @Column()
  day: string;
}
