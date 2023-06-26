import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './UserService';
import { User } from './User';
import { UserPo } from './UserPo';
import { ResultInfo } from '../../core/bean/ResultInfo';
import { AlipayCallbackBean } from "../../thirdparty/payment/alipay/bean/AlipayCallbackBean";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('getList')
  async getList(@Body() po: UserPo): Promise<ResultInfo> {
    console.log('po ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.userService.getList(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('add')
  async add(@Body() user: User): Promise<ResultInfo> {
    console.log('user ' + JSON.stringify(user));
    const info = new ResultInfo();
    try {
      info.data = await this.userService.add(user);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('remove')
  async remove(@Body() user: User): Promise<ResultInfo> {
    console.log('user ' + JSON.stringify(user));
    const info = new ResultInfo();
    try {
      info.data = await this.userService.remove(user.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('getUserInfo')
  async getUserInfo(@Body() user: User): Promise<ResultInfo> {
    console.log('user ' + JSON.stringify(user));
    const info = new ResultInfo();
    try {
      info.data = await this.userService.get(user.id);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('loginWithPassword')
  async loginWithPassword(@Body() user: User): Promise<ResultInfo> {
    console.log('user ' + JSON.stringify(user));
    const info = new ResultInfo();
    try {
      info.data = await this.userService.loginWithPassword(user);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('loginWithPassword')
  async loginWithValidCode(@Body() user: User): Promise<ResultInfo> {
    console.log('user ' + JSON.stringify(user));
    const info = new ResultInfo();
    try {
      info.data = await this.userService.loginWithValidCode(user);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('getValidCode')
  async getValidCode(@Body() po: UserPo): Promise<ResultInfo> {
    console.log('user ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.userService.getValidCode(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('recharge')
  async recharge(@Body() po: UserPo): Promise<ResultInfo> {
    console.log('user ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.userService.recharge(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }

  @Post('zfbCallback')
  async zfbCallback(@Body() po: AlipayCallbackBean): Promise<ResultInfo> {
    console.log('user ' + JSON.stringify(po));
    const info = new ResultInfo();
    try {
      info.data = await this.userService.zfbCallback(po);
      info.code = 200;
    } catch (e) {
      info.code = 1;
      info.message = e.message;
    }
    return info;
  }
}
