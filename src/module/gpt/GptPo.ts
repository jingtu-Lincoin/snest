import { BasePo } from '../../core/bean/BasePo';

export class GptPo extends BasePo {
  userId: number;
  recordId: number;
  difficulty: string; //难度
  style: string; //风格
  token: string; //token
}
