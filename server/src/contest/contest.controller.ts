import { Controller, Get } from '@nestjs/common';
import { ContestService } from './contest.service';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @Get('kaggle')
  getKaggleList(): string {
    return this.getKaggleList();
  }
}
