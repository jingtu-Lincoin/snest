import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from './UserService';
import { User } from './User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('getList')
  getList(): Promise<Array<User>> {
    return this.userService.getList();
  }


  @Post('add')
  add(@Body() user: User): Promise<User> {
    console.log("user "+JSON.stringify(user))
    return this.userService.add(user);
  }
}
