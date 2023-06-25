import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

/**
 * 通用的短信验证码表
 */
@Entity('t_sms_code')
export class SmsCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  tel: string;
  /**
   * 验证码
   */
  @Column()
  code: string;
  /**
   * 发送时间
   */
  @Column()
  ctime: string;
}
