import { Body, Inject, Injectable } from '@nestjs/common';
import { Order } from './Order';
import { OrderPo } from './OrderPo';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { Media } from '../media/Media';

@Injectable()
export class OrderService {
  async getList(po: OrderPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = Order.createQueryBuilder('order');
    if (po.name) {
      query.where('order.name like :name', { name: `%${po.name}%` });
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

  add(order: Order) {
    order.ctime = TimeUtil.getNow();
    return Order.save(order);
  }
  remove(id: number) {
    return Order.delete(id);
  }

  async get(id: number) {
    return Order.findOne({
      where: {
        id: id,
      },
    });
  }

  async createUserOrder(po: OrderPo) {
    const orderIndex = await this.getTodayMaxOrderIndex();
    const order = new Order();
    order.name = po.userName;
    order.tel = po.tel;
    order.sn = 'F' + orderIndex;
    order.orderIndex = orderIndex;
    order.ctime = TimeUtil.getNow();
    return Order.save(order);
  }

  private async getTodayMaxOrderIndex() {
    let orderIndex = 1;
    const today = TimeUtil.getToday();
    const query = Order.createQueryBuilder('order');
    query.where('order.day like :day', { ctime: `%${today}%` });
    query.orderBy('order.orderIndex', 'DESC');
    query.take(1);
    const result = query.getOne();
    await result.then((value) => {
      if (value) {
        orderIndex = value.orderIndex + 1;
      }
    });
    return orderIndex;
  }

  async upload(file: Express.Multer.File, po: OrderPo) {
    const media = await this.createMedia(file, po);
    return media;
  }

  private createMedia(file: Express.Multer.File, po: OrderPo) {
    const media = new Media();
    media.name = file.originalname;
    media.size = file.size;
    media.type = file.mimetype;
    media.ctime = TimeUtil.getNow();
    media.path = file.path;
    media.bid = po.id;
    media.bcode = 'order';
    media.bname = '订单';
    return Media.save(media);
  }
}
