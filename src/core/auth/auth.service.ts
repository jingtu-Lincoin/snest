import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/UserService';
import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import { UserPo } from '../user/UserPo';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(userPo: any): Promise<any> {
    const tel = userPo.tel;
    const password = userPo.password;
    if (_.isEmpty(tel) || _.isEmpty(password)) {
      throw new UnauthorizedException('用户名或密码不能为空');
    }
    //  const user = await this.userService.findLoginUser(tel);
    const user = {
      id: 1,
      name: 'admin',
      password: '$2a$1',
    };
    if (_.isEmpty(user)) {
      throw new UnauthorizedException('用户不存在');
    }
    const isValidPwd = await bcrypt.compare(password, user.password);
    if (!isValidPwd) {
      throw new UnauthorizedException('账号或密码错误');
    }
    const tempUser = {
      id: user.id,
      name: user.name,
    };
    return tempUser;
  }

  async login(userInfo: UserPo) {
    return this.createToken(userInfo);
  }

  createToken({ name, id }: UserPo) {
    const token = this.jwtService.sign({ name, id });
    const expires = process.env.JWT_EXPIRE;
    return {
      token,
      expires,
    };
  }
}
