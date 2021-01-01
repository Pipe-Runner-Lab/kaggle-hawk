import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { generateKaggleJSON } from 'src/parser/kaggle';
import { writeToJSON } from 'src/utils/json-writer';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  runKaggleParser() {
    generateKaggleJSON()
      .then((list) => writeToJSON('kaggle', list))
      .then(() => console.log('Successful write'));
  }
}
