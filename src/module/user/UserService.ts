import { Inject, Injectable } from "@nestjs/common";
import { User } from "./User";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>
  // ) {}

  getList(): Promise<Array<User>> {
    return  User.find();
  }

  add(user: User) {
    return User.save(user);
  }
}
