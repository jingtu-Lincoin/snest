import { Injectable } from '@nestjs/common';
import { User } from '../entities/User';


@Injectable()
export class UserDao {
  getList(): Array<User> {
    const list = new Array<User>();
    list.push(new User(1, 'user1', 20));
    list.push(new User(2, 'user2', 21));
    list.push(new User(3, 'user3', 22));
    list.push(new User(4, 'user4', 23));

    return list;
  }

  add(user: User) {
    return user;
  }
}
