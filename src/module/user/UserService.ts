import { Inject, Injectable } from '@nestjs/common';
import { User } from './User';
import RedisUtil from '../../util/RedisUtil';
import TimeUtil from '../../util/TimeUtil';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>
  // ) {}

  getList(): Promise<Array<User>> {
    return User.find();
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
