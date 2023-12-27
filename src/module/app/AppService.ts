import { Inject, Injectable } from '@nestjs/common';
import { AppointService } from '../appoint/AppointService';
import { AppPo } from './AppPo';
import { AppData } from './AppData';
import { Appoint } from '../appoint/Appoint';
import { MessageBoard } from '../messageBoard/MessageBoard';
import { Article } from '../article/Article';
import { Teacher } from '../teacher/Teacher';
import { Student } from '../student/Student';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getAppData(po: AppPo) {
    const data = new AppData();
    data.appointmentCount = await Appoint.count();
    data.studentCount = await Student.count();
    data.teacherCount = await Teacher.count();
    data.messageBoardCount = await MessageBoard.count();
    data.articleCount = await Article.count();
    return data;
  }
}
