import { Body, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsCode } from './SmsCode';
import TimeUtil from '../../../util/TimeUtil';

@Injectable()
export class SmsCodeService {
  getByTel(tel: string): Promise<SmsCode | null> {
    return SmsCode.findOne({
      where: {
        tel,
      },
    });
  }

  async addSmsCode(tel: string, code: string): Promise<SmsCode> {
    const temp = await this.getByTel(tel);
    if (temp) {
      temp.code = code;
      return temp.save();
    } else {
      return SmsCode.create({
        tel,
        code,
        ctime: TimeUtil.getNow(),
      }).save();
    }
  }

  async checkSmsCode(tel: string, code: string): Promise<boolean> {
    const temp = await this.getByTel(tel);
    if (temp) {
      return temp.code === code;
    } else {
      return false;
    }
  }
}
