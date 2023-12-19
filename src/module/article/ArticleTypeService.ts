import { Body, Inject, Injectable } from '@nestjs/common';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { ArticleTypePo } from './ArticleTypePo';
import { ArticleType } from './ArticleType';

@Injectable()
export class ArticleTypeService {
  async getList(po: ArticleTypePo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = ArticleType.createQueryBuilder('articleType');
    if (po.name) {
      query.where('articleType.name like :name', { name: `%${po.name}%` });
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

  add(order: ArticleType) {
    return ArticleType.save(order);
  }
  remove(id: number) {
    return ArticleType.delete(id);
  }

  async get(id: number) {
    return ArticleType.findOne({
      where: {
        id: id,
      },
    });
  }
}
