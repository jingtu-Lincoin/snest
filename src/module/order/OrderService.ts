import { Body, Inject, Injectable } from '@nestjs/common';
import { Order } from './Order';
import { OrderPo } from './OrderPo';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { Media } from '../media/Media';
import { MediaService } from '../media/MediaService';
import * as archiver from 'archiver';
import * as fs from 'fs';
import * as process from 'process';

@Injectable()
export class OrderService {
  mediaService = new MediaService();
  async getList(po: OrderPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = Order.createQueryBuilder('torder');
    if (po.sn) {
      query.where('torder.sn = :sn', { sn: po.sn });
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
    order.userName = po.userName;
    order.tel = po.tel;
    order.status = "3";
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
    let media = null;
    const order = await this.get(po.id);
    if (order) {
      media = await this.createMedia(file, order);
      order.imageCount = order.imageCount + 1;
      Order.save(order);
    }
    return media;
  }

  private createMedia(file: Express.Multer.File, order: Order) {
    const httpUrl = process.env.FILE_UPLAD_URL;
    const media = new Media();
    media.userId = order.userId;
    media.userName = order.userName;
    media.name = file.originalname;
    media.size = file.size;
    media.type = file.mimetype;
    media.ctime = TimeUtil.getNow();
    media.path = file.path;
    media.url = httpUrl + file.path;
    media.url = media.url.replace('/public', ''); // 去掉/public
    media.bid = order.id;
    media.bcode = 'order';
    media.bname = order.sn;
    return Media.save(media);
  }

  async archiveImages(id: number) {
    const zipName = id + '.zip';
    const zipPath = 'archive/' + zipName;
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });
    archive.pipe(output);
    const medias = await this.mediaService.findByBid(id);
    if (medias) {
      medias.forEach((media) => {
        if (media) {
          archive.append(fs.createReadStream(media.path), { name: media.name });
        }
      });
      await archive.finalize();
      return zipPath;
    }
    return zipPath;
  }

  async archiveImagesNew(id: number) {
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });
    const medias = await this.mediaService.findByBid(id);
    if (medias) {
      medias.forEach((media) => {
        if (media) {
          archive.append(fs.createReadStream(media.path), { name: media.name });
        }
      });
      archive.finalize();
      return archive;
    }
  }

  async getUserOrders(po: OrderPo) {
    console.log('po ' + JSON.stringify(po));
    const query = Order.createQueryBuilder('torder');
    query.where('torder.tel = :tel', { tel: po.tel });
    query.andWhere('torder.userName = :userName', { userName: po.userName });
    query.andWhere('torder.status = :status', { status: po.status });
    query.orderBy('torder.ctime', 'DESC');
    // query.skip((po.page - 1) * po.pageSize);
    // query.take(po.pageSize);
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
    query.andWhere('torder.userName = :userName', { userName: po.userName });
    query.andWhere('torder.day = :today', { today: today });
    console.log('getUserTodayOrder ' + query.getSql());
    const result = query.getOne();
    const order = await result.then((value) => {
      return value;
    });
    console.log('getUserTodayOrder ' + JSON.stringify(order));
    return order;
  }

  async updateOrderStatus(po: OrderPo) {
    const order = await this.get(po.id);
    if (order) {
      order.status = po.status;
      return Order.save(order);
    }
  }

  /**
   * 更新订单图片数量
   * @param id
   */
  async updateMediaCount(id: number, count: number) {
    const order = await this.get(id);
    if (order) {
      order.imageCount += count
      Order.save(order);
    }
  }
}
