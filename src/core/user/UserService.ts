import { Body, Inject, Injectable } from '@nestjs/common';
import { User } from './User';
import { UserPo } from './UserPo';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { SmsCodeService } from '../../thirdparty/sms/core/SmsCodeService';
import * as process from 'process';
import { AlipayService } from '../../thirdparty/payment/alipay/AlipayService';
import { ResultInfo } from '../bean/ResultInfo';
import { AlipayCallbackBean } from '../../thirdparty/payment/alipay/bean/AlipayCallbackBean';
import { PaymentService } from '../../thirdparty/payment/core/PaymentService';
import { Payment } from '../../thirdparty/payment/core/Payment';
import { WeiXinLoginService } from '../../thirdparty/login/weixin/WeiXinLoginService';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>
  // ) {}
  smsCodeService = new SmsCodeService();
  alipayService = new AlipayService();
  paymentService = new PaymentService();
  weiXinLoginService = new WeiXinLoginService();

  async getList(po: UserPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = User.createQueryBuilder('user');
    if (po.name) {
      query.where('user.name like :name', { name: `%${po.name}%` });
    }
    query.skip((po.page - 1) * po.pageSize);
    query.take(po.pageSize);
    const result = query.getManyAndCount();
    await result.then((value) => {
      page.list = value[0];
      page.pageCount = Util.getPageCount(value[1], po.pageSize);
    });
    return page;
  }

  add(user: User) {
    user.ctime = TimeUtil.getNow();
    user.token = Util.getUUID();
    user.level = '0';
    user.credits = 5;
    return User.save(user);
  }
  remove(id: number) {
    return User.delete(id);
  }

  async get(id: number) {
    return User.findOne({
      where: {
        id: id,
      },
    });
  }

  /**
   * 更新用户积分
   * @param number
   */
  updateUserCredit(id: number, credits: number) {
    const user = this.get(id);
    user.then((value) => {
      if (value) {
        value.credits += credits;
        User.save(value);
      }
    });
  }

  async loginWithPassword(user: User) {
    const query = User.createQueryBuilder('user');
    query.where('user.tel = :tel', { tel: user.tel });
    query.andWhere('user.password = :password', { password: user.password });
    const result = await query.getOne();
    if (result) {
      this.updateUserToken(result);
      return result;
    } else {
      return null;
    }
  }

  private updateUserToken(result: User) {
    result.token = Util.getUUID();
    result.lastLoginTime = TimeUtil.getNow();
    User.save(result);
  }

  async loginWithValidCode(user: User) {
    const check = await this.smsCodeService.checkSmsCode(
      user.tel,
      user.validCode,
    );
    if (!check) {
      return null;
    }
    const query = User.createQueryBuilder('user');
    query.where('user.tel = :tel', { tel: user.tel });
    const result = await query.getOne();
    if (result) {
      this.updateUserToken(result);
      return result;
    } else {
      const newUser = new User();
      newUser.tel = user.tel;
      newUser.name = user.tel;
      newUser.ctime = TimeUtil.getNow();
      newUser.token = Util.getUUID();
      newUser.level = '0';
      newUser.credits = 5;
      return User.save(newUser);
    }
    return null;
  }

  async getValidCode(po: UserPo) {
    return this.smsCodeService.sendSmsCode(po.tel);
  }

  async recharge(po: UserPo) {
    const info = new ResultInfo();
    const params = {
      totalAmount: process.env.USER_RECHARGE_MONEY,
      outTradeNo: Util.getUUID(),
      subject: '用户充值',
    };
    this.createPayment(params, po);
    info.data = await this.alipayService.payForPc(params);
    info.code = 200;
    return info;
  }

  async zfbCallback(po: AlipayCallbackBean) {
    const payment = await this.paymentService.getByOutTradeNo(po.out_trade_no);
    if (payment) {
      payment.payStatus = '2';
      payment.payTime = TimeUtil.getNow();
      this.paymentService.add(payment);
      const user = await this.get(payment.userId);
      if (user) {
        user.level = '1';
        user.credits = 20;
        user.rechargeCount += 1;
        User.save(user);
      }
    }
  }

  private createPayment(
    params: { totalAmount: any; outTradeNo: string },
    po: UserPo,
  ) {
    const payment = new Payment();
    payment.outTradeNo = params.outTradeNo;
    payment.totalAmount = params.totalAmount;
    payment.payStatus = '1';
    payment.channel = 'alipay';
    payment.userId = po.id;
    payment.userName = po.name;
    payment.ctime = TimeUtil.getNow();
    this.paymentService.add(payment);
  }

  async weixinLogin(po: UserPo) {
    const userInfo = await this.weiXinLoginService.weixinLogin(po.code);
    if (userInfo) {
      let user = await this.findByOpenId(userInfo.openid);
      if (user) {
        this.updateUserToken(user);
        return user;
      } else {
        user = new User();
        user.openid = userInfo.openid;
        user.name = userInfo.nickname;
        user.avatarUrl = userInfo.headimgurl;
        user.ctime = TimeUtil.getNow();
        user.token = Util.getUUID();
        user.credits = 5;
        user.level = '0';
        return User.save(user);
      }
    }
  }

  private findByOpenId(openid: string) {
    return User.findOne({
      where: {
        openid,
      },
    });
  }

  initUserCredit() {
    const allUser = User.find();
    allUser.then((value) => {
      value.forEach((user) => {
        if (user.level === '0') {
          user.credits = 5;
        } else if (user.level === '1') {
          user.credits = 20;
        }
        User.save(user);
      });
    });
  }
}
