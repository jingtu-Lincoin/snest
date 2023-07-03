import { Inject, Injectable } from '@nestjs/common';
import FileParser from '../../thirdparty/file/FileParser';
import * as openai from '@azure/openai';
import { ResultInfo } from '../../core/bean/ResultInfo';
import { UserService } from '../../core/user/UserService';
import { GptRecord } from './GptRecord';
import TimeUtil from '../../util/TimeUtil';
import { Page } from '../../core/bean/Page';
import { User } from '../../core/user/User';
import Util from '../../util/Util';
import { GptPo } from './GptPo';
import UploadResult from '../../thirdparty/file/UploadResult';

@Injectable()
export class GptService {
  private mOpenAIConfig = new openai.AzureKeyCredential(
    process.env.AZURE_OPENAI_KEY!,
  );
  private mOpenAI = new openai.OpenAIClient(
    process.env.AZURE_OPENAI_ENDPOINT!,
    this.mOpenAIConfig,
  );
  @Inject()
  userService: UserService;
  async upload(
    file: Express.Multer.File,
    user: User,
  ): Promise<UploadResult> {
    console.log('file ' + file.path + ' originalname ' + file.originalname);
    const info = new UploadResult();
    const text = await FileParser.readText(file);
    if (text) {
      info.data = await this.saveGptRecord(user, file, text);
    }
    return info;
  }

  private async _loadGptData(text: string) {
    if (text.length > 1200) {
      text = text.substring(text.length - 1200);
    }
    console.log('发送的内容为 ' + text);
    const mMsg = [{ role: 'user', content: `针对文件提3个问题: ${text}` }];
    const mModel = process.env.AZURE_OPENAI_DeploymentName + '';
    const gptResponse = await this.mOpenAI.getChatCompletions(mModel, mMsg);
    return gptResponse.choices.map((item) => item.message!.content).join('');
  }

  private saveGptRecord(user: User, file: Express.Multer.File, data: any) {
    const record = new GptRecord();
    record.userId = user.id;
    record.userName = user.name;
    record.tel = user.tel;
    record.ctime = TimeUtil.getNow();
    record.filePath = file.path;
    record.fileName = file.originalname;
    record.origin = data;
    return GptRecord.save(record);
  }

  async getList(po: GptPo): Promise<Page> {
    console.log('po ' + JSON.stringify(po));
    const page = new Page();
    page.page = po.page;
    page.pageSize = po.pageSize;
    const query = GptRecord.createQueryBuilder('gptRecord');
    if (po.userId) {
      query.where('gptRecord.userId = :userId', { userId: po.userId });
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

  async loadGptData(po: GptPo) {
    const result = new ResultInfo();
    const record = await GptRecord.findOne({ where: { id: po.recordId } });
    if (record && record.content === null) {
      const user = await this.userService.get(record.userId);
      if (user && user.credits > 0) {
        const data = await this._loadGptData(
          po.style + ' ' + po.difficulty + record.origin,
        );
        if (data) {
          record.content = data;
          await GptRecord.save(record);
          user.credits--;
          user.generateCount++;
          User.save(user);
          result.data = data;
          result.code = 200;
        }
      } else {
        result.code = 1;
        result.message = '积分不足';
      }
    }
    return result;
  }
}
