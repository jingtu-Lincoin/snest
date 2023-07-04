import { BasePo } from '../../core/bean/BasePo';

export class OrderPo extends BasePo {
  userId: number;
  day: string;
  name: string; // 姓名
  tel: string; // 电话
  sn: string;
  status: string;
}
