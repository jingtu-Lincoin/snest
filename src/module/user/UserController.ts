import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './UserService';
import { User } from './User';
import { Page } from '../../core/bean/Page';
import { UserPo } from './UserPo';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('getList')
  getList(@Body() po: UserPo): Promise<Page> {
    return this.userService.getList(po);
  }

  @Post('add')
  add(@Body() user: User): Promise<User> {
    console.log('user ' + JSON.stringify(user));
    return this.userService.add(user);
  }

  @Get('getToken')
  getToken(): any {
    return this.userService.getToken();
  }

  @Get('getTokenFromList')
  getTokenFromList(): any {
    return this.userService.getTokenFromList();
  }

  @Get('addRecord')
  addRecord(): any {
    return this.userService.addRecord();
  }
}
