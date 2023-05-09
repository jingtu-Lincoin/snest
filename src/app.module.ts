import { Module } from '@nestjs/common';
import { AppController } from './controller/AppController';
import { AppService } from './service/AppService';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./entities/User";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {

}
