import { Body, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsCode } from './SmsCode';
import TimeUtil from '../../../util/TimeUtil';
import Util from '../../../util/Util';
import { TxSmsSender } from '../txsms/TxSmsSender';

export class SmsCodeService {
  txSmsSender = new TxSmsSender();
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

  async sendSmsCode(tel: string): Promise<SmsCode> {
    const code = Util.randomNumbers(4);
    //await this.txSmsSender.sendValidCode(tel, code);
    const result = await this.addSmsCode(tel, code);
    console.log('result ' + JSON.stringify(result));
    return result;
  }
}
