import { Body, Inject, Injectable } from '@nestjs/common';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { StudentPo } from './StudentPo';
import { Student } from './Student';

@Injectable()
export class StudentService {
  async getList(po: StudentPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = Student.createQueryBuilder('student');
    if (po.name) {
      query.where('user.name like :name', { name: `%${po.name}%` });
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
}
