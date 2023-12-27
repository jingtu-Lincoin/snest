import { Body, Inject, Injectable } from '@nestjs/common';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { AppointPo } from './AppointPo';
import { Appoint } from './Appoint';

@Injectable()
export class AppointService {
  async getList(po: AppointPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = Appoint.createQueryBuilder('Appoint');
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

  add(order: Appoint) {
    order.ctime = TimeUtil.getNow();
    return Appoint.save(order);
  }
  remove(id: number) {
    return Appoint.delete(id);
  }

  async get(id: number) {
    return Appoint.findOne({
      where: {
        id: id,
      },
    });
  }

  async getUserAppoints(po: AppointPo) {
    const query = Appoint.createQueryBuilder('appoint');
    query.where('appoint.studentId = :studentId', { studentId: po.studentId });
    return query.getMany();
  }

  async getAllCount() {
    return Appoint.count();
  }
}
