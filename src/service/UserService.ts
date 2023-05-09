import { Inject, Injectable } from "@nestjs/common";
import { User } from "../entities/User";

@Injectable()
export class UserService {

  getList(): Promise<Array<User>> {
    return  User.find();
  }

  add(user: User) {
    return User.save(user);
  }
}
