import { HttpService } from '@nestjs/axios';
import { UserInfo } from './UserInfo';
import * as process from 'process';
import Util from "../../../util/Util";
export class WeiXinLoginService {
  private httpService = new HttpService();
  private tokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token';
  private userInfoUrl = 'https://api.weixin.qq.com/sns/userinfo';

  public async weixinLogin(code: string): Promise<UserInfo> {
    const token = await this.getAccessToken(code);
    const result = await this.getUserInfo(token);
    let userInfo = new UserInfo();
    userInfo = Object.assign(userInfo, result);
    console.log('userInfo ' + JSON.stringify(userInfo));
    return userInfo;
  }

  private async getAccessToken(code: string) {
    const params = {
      appid: process.env.TX_WEIXIN_LOGIN_APP_ID + '',
      secret: process.env.TX_WEIXIN_LOGIN_APP_SECRET + '',
      code: code,
      grant_type: 'authorization_code',
    };
    const url = Util.spliceUrlParams(this.tokenUrl, params);
    console.log('getAccessToken url ' + url);
    const res = await this.httpService.get(url).toPromise();
    return res?.data;
  }

  private async getUserInfo(token: any) {
    const params = {
      access_token: token.access_token,
      openid: token.openid,
    };
    console.log('getUserInfo params ' + JSON.stringify(params));
    const res = await this.httpService
      .get(this.userInfoUrl, { params })
      .toPromise();
    return res!.data;
  }
}
