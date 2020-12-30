import { Injectable } from '@nestjs/common';

@Injectable()
export class ContestService {
  getKaggleList(): string {
    return 'Hi I am contest';
  }
}
