import { Body, Inject, Injectable } from '@nestjs/common';
import { User } from './User';
import RedisUtil from '../../util/RedisUtil';
import TimeUtil from '../../util/TimeUtil';
import { UserPo } from './UserPo';
import { Like } from 'typeorm';
import { Page } from '../../core/bean/Page';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>
  // ) {}

  async getList(po: UserPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    const query = User.createQueryBuilder('user');
    if (po.name) {
      query.where('user.name like :name', { name: `%${po.name}%` });
    }
    query.skip(po.page * po.pageSize);
    query.take(po.pageSize);
    const result = query.getManyAndCount();
    await result.then((value) => {
      page.data = value[0];
      page.total = value[1];
    });
    return page;
  }

  add(user: User) {
    return User.save(user);
  }

  async getToken() {
    const obj = await new RedisUtil().get('123456');
    if (obj) {
      const jsonObj = JSON.parse(obj);
      if (new TimeUtil().expried(jsonObj['etime'])) {
        console.log('token ' + jsonObj['token'] + ' expired');
      } else {
        console.log('token ' + jsonObj['token'] + ' not expired');
      }
    }
    return obj;
  }

  async getTokenFromList() {
    const token = await new RedisUtil().getFromList(
      'token_ip_records',
      'token',
      '1234567',
    );
    console.log('token ' + token);
    return token;
  }

  addRecord() {
    const record = {
      token: '1234568',
      ip: '192.168.1.102',
      count: 5,
    };
    new RedisUtil().addToList('token_ip_records', record, 'token');
  }
}
