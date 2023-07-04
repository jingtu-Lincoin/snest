import { Body, Inject, Injectable } from '@nestjs/common';
import { Order } from './Order';
import { OrderPo } from './OrderPo';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { Media } from '../media/Media';
import { MediaService } from '../media/MediaService';
import archiver from 'archiver';
import * as fs from 'fs';

@Injectable()
export class OrderService {
  mediaService = new MediaService();
  async getList(po: OrderPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = Order.createQueryBuilder('torder');
    if (po.status) {
      query.where('torder.status = :status', { status: po.status });
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
    const userTodayOrder = await this.getUserTodayOrder(po);
    if (userTodayOrder) {
      return userTodayOrder;
    }
    const orderIndex = await this.getTodayMaxOrderIndex();
    const order = new Order();
    order.name = po.name;
    order.tel = po.tel;
    order.sn = 'F' + orderIndex;
    order.orderIndex = orderIndex;
    order.ctime = TimeUtil.getNow();
    order.day = TimeUtil.getToday();
    return Order.save(order);
  }

  private async getTodayMaxOrderIndex() {
    const orderIndex = 1;
    const today = TimeUtil.getToday();
    const query = Order.createQueryBuilder('torder');
    query.where('torder.day = :today', { today: today });
    query.orderBy('torder.orderIndex', 'DESC');
    query.skip(0);
    query.take(1);
    const result = query.getOne();
    const order = await result.then((value) => {
      return value;
    });
    console.log('order ' + JSON.stringify(order));
    return order ? order.orderIndex + 1 : orderIndex;
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

  archiveImages(po: OrderPo) {
    const zipName = po.sn + '.zip';
    const output = fs.createWriteStream(__dirname + '/tmp/' + zipName);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });
    archive.pipe(output);
    const medias = this.mediaService.findByBid(po.id);
    medias.then((media) => {
      if (media) {
        archive.append(fs.createReadStream(media.path), { name: media.name });
      }
    });
    archive.finalize();
  }

  async getUserOrders(po: OrderPo) {
    console.log('po ' + JSON.stringify(po));
    const query = Order.createQueryBuilder('torder');
    query.where('torder.tel = :tel', { tel: po.tel });
    query.andWhere('torder.name = :name', { name: po.name });
    query.skip((po.page - 1) * po.pageSize);
    query.take(po.pageSize);
    const result = query.getManyAndCount();
    const list = await result.then((value) => {
      return value[0];
    });
    return list;
  }

  private async getUserTodayOrder(po: OrderPo) {
    const today = TimeUtil.getToday();
    const query = Order.createQueryBuilder('torder');
    query.where('torder.tel = :tel', { tel: po.tel });
    query.andWhere('torder.name = :name', { name: po.name });
    query.andWhere('torder.day = :today', { today: today });
    console.log('getUserTodayOrder ' + query.getSql());
    const result = query.getOne();
    const order = await result.then((value) => {
      return value;
    });
    console.log('getUserTodayOrder ' + JSON.stringify(order));
    return order;
  }
}
