import { Body, Inject, Injectable } from '@nestjs/common';
import { User } from './User';
import { UserPo } from './UserPo';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { SmsCodeService } from '../../thirdparty/sms/core/SmsCodeService';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>
  // ) {}
  @Inject()
  smsCodeService = new SmsCodeService();

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
  updateUserCredit(id: number, credit: number) {
    const user = this.get(id);
    user.then((value) => {
      if (value) {
        value.credit += credit;
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
      return null;
    }
  }
}
