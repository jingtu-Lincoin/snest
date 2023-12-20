import { Body, Inject, Injectable } from '@nestjs/common';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { MessageBoardPo } from './MessageBoardPo';
import { MessageBoard } from './MessageBoard';

@Injectable()
export class MessageBoardService {
  async getList(po: MessageBoardPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = MessageBoard.createQueryBuilder('MessageBoard');
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

  add(order: MessageBoard) {
    order.ctime = TimeUtil.getNow();
    order.status = '2';
    return MessageBoard.save(order);
  }
  remove(id: number) {
    return MessageBoard.delete(id);
  }

  async get(id: number) {
    return MessageBoard.findOne({
      where: {
        id: id,
      },
    });
  }

  async reply(po: MessageBoardPo) {
    const message = await this.get(po.id);
    if (message) {
      message.replyContent = po.replyContent;
      message.status = '1';
      return MessageBoard.save(message);
    }
  }
}
