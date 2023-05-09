import { Injectable } from '@nestjs/common';
import { UserDao } from '../dao/UserDao';
import { User } from "../entities/User";

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}
  getList(): Array<User> {
    return this.userDao.getList();
  }

  add(user: User) {
    return this.userDao.add(user);
  }
}
