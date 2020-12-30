import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ContestModule } from './contest/contest.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [ScheduleModule.forRoot(), ContestModule, JobModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
