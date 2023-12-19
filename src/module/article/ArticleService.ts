import { Body, Inject, Injectable } from '@nestjs/common';
import { Page } from '../../core/bean/Page';
import Util from '../../util/Util';
import TimeUtil from '../../util/TimeUtil';
import { ArticlePo } from './ArticlePo';
import { Article } from './Article';

@Injectable()
export class ArticleService {
  async getList(po: ArticlePo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = Article.createQueryBuilder('article');
    if (po.name) {
      query.where('article.title like :title', { name: `%${po.title}%` });
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

  add(order: Article) {
    order.ctime = TimeUtil.getNow();
    return Article.save(order);
  }
  remove(id: number) {
    return Article.delete(id);
  }

  async get(id: number) {
    return Article.findOne({
      where: {
        id: id,
      },
    });
  }
}
