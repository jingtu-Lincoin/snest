import { BasePo } from '../../core/bean/BasePo';

export class UserPo extends BasePo {
  tel: string;
  password: string;
  validCode: string;
  code: string; //微信登录前台返回的code
  name: string;
}
