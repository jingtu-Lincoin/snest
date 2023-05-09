import { Module } from '@nestjs/common';
import { AppController } from './controller/AppController';
import { AppService } from './service/AppService';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';
import { UserDao } from './dao/UserDao';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, UserDao],
})
export class AppModule {

}
