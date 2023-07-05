import { Body, Inject, Injectable } from '@nestjs/common';
import { Media } from './Media';
import { MediaPo } from './MediaPo';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';

@Injectable()
export class MediaService {
  async getList(po: MediaPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = Media.createQueryBuilder('media');
    if (po.name) {
      query.where('media.name like :name', { name: `%${po.name}%` });
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

  add(media: Media) {
    media.ctime = TimeUtil.getNow();
    return Media.save(media);
  }
  remove(id: number) {
    return Media.delete(id);
  }

  async get(id: number) {
    return Media.findOne({
      where: {
        id: id,
      },
    });
  }

  /**
   * 根据bid查询
   * @param bid
   */
  async findByBid(bid: number) {
    return Media.find({
      where: {
        bid: bid,
      },
    });
  }
}
