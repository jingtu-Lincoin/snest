import { Module } from '@nestjs/common';
import { AppController } from './module/app/AppController';
import { AppService } from './module/app/AppService';
import { UserModule } from './core/user/UserModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './core/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './core/user/User';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StudentModule } from './module/student/StudentModule';
import { TeacherModule } from './module/teacher/TeacherModule';
import { AppointModule } from './module/appoint/AppointModule';
import { ArticleModule } from './module/article/ArticleModule';
import { MessageBoardModule } from './module/messageBoard/MessageBoardModule';
import { Student } from './module/student/Student';
import { Teacher } from './module/teacher/Teacher';
import { Article } from './module/article/Article';
import { Appoint } from './module/appoint/Appoint';
import { MessageBoard } from './module/messageBoard/MessageBoard';
import { ArticleTypeModule } from './module/article/ArticleTypeModule';
import { FileService } from './module/app/FileService';
import { FileController } from './module/app/FileController';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as nuid from 'nuid';
import dayjs = require('dayjs');
import * as process from 'process';
const uploadPath = 'public/upload';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass',
      database: 'psy',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Student, Teacher, Article, Appoint, MessageBoard],
    }),
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: uploadPath + `/${dayjs().format('YYYYMMDD')}`,
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/src/(.*)'],
    }),
    UserModule,
    AuthModule,
    StudentModule,
    TeacherModule,
    AppointModule,
    ArticleModule,
    MessageBoardModule,
    ArticleTypeModule,
  ],
  controllers: [AppController, FileController],
  providers: [AppService, FileService],
})
export class AppModule {}
