import { Body, Inject, Injectable } from '@nestjs/common';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { TeacherPo } from './TeacherPo';
import { Teacher } from './Teacher';

@Injectable()
export class TeacherService {
  async getList(po: TeacherPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = Teacher.createQueryBuilder('Teacher');
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

  add(order: Teacher) {
    order.ctime = TimeUtil.getNow();
    return Teacher.save(order);
  }
  remove(id: number) {
    return Teacher.delete(id);
  }

  async get(id: number) {
    return Teacher.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllCount() {
    return Teacher.count();
  }
}
