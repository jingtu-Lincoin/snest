import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from '../service/UserService';
import { User } from '../entities/User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('getList')
  getList(): Array<User> {
    return this.userService.getList();
  }

  @Post('add')
  add(@Body() user: User): User {
    console.log('user ' + JSON.stringify(user));
    return this.userService.add(user);
  }
}
