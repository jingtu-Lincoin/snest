import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from "../../core/user/UserService";

@Injectable()
export class GptTask {
  private readonly logger = new Logger(GptTask.name);
  userService = new UserService();

  /**
   * 每天凌晨1点5分执行一次
   */
  @Cron('0 5 1 * * * ')
  initUserCredit() {
    this.logger.debug('before userService.initUserCredit');
    this.userService.initUserCredit();
    this.logger.debug('after userService.initUserCredit');

  }
}
