import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { generateKaggleJSON } from 'src/parser/kaggle';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  runKaggleParser() {
    this.logger.debug('Running Kaggle Parser');
    generateKaggleJSON();
  }
}
