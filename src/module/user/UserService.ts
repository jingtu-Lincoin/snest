import { Body, Inject, Injectable } from '@nestjs/common';
import { User } from './User';
import RedisUtil from '../../util/RedisUtil';
import TimeUtil from '../../util/TimeUtil';
import { UserPo } from './UserPo';
import { Like } from 'typeorm';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>
  // ) {}

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
}
