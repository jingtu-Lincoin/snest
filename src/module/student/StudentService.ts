import { Body, Inject, Injectable } from '@nestjs/common';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { StudentPo } from './StudentPo';
import { Student } from './Student';
import { ResultInfo } from '../../core/bean/ResultInfo';

@Injectable()
export class StudentService {
  async getList(po: StudentPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = Student.createQueryBuilder('student');
    if (po.name) {
      query.where('student.name like :name', { name: `%${po.name}%` });
    }
    query.skip((po.page - 1) * po.pageSize);
    query.take(po.pageSize);
    const result = query.getManyAndCount();
    await result.then((value) => {
      page.list = value[0];
      page.pageCount = Util.getPageCount(value[1], po.pageSize);
    });
    return page;
  }

  add(order: Student) {
    order.ctime = TimeUtil.getNow();
    return Student.save(order);
  }
  remove(id: number) {
    return Student.delete(id);
  }

  async get(id: number) {
    return Student.findOne({
      where: {
        id: id,
      },
    });
  }

  async login(student: Student) {
    const query = Student.createQueryBuilder('student');
    query.where('student.code = :code', { code: student.code });
    query.andWhere('student.password = :password', {
      password: student.password,
    });
    const result = query.getOne();
    return result;
  }

  async changePassword(po: StudentPo) {
    const info = new ResultInfo();
    const student = await this.get(po.id);
    if (student != null) {
      if (student.password != po.oldPassword) {
        info.message = '原密码错误';
      } else {
        student.password = po.newPassword;
        info.data = await this.add(student);
      }
    }
    return info;
  }

  async updateHead(po: StudentPo) {
    const student = await this.get(po.id);
    if (student != null) {
      student.userHead = po.userHead;
      await this.add(student);
    }
    return student;
  }

  async getAllCount() {
    return Student.count();
  }
}
