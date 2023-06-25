import { BasePo } from '../../core/bean/BasePo';

export class GptPo extends BasePo {
  userId: number;
  recordId: number;
  prompt: string; //提示
  token: string; //token
}
