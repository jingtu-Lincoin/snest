import { BasePo } from '../../core/bean/BasePo';

export class OrderPo extends BasePo {
  userId: number;
  day: string;
  name: string;
  tel: string; // 电话
  sn: string;
  status: string;
  userName: string;
}
