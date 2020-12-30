import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContestModule } from './contest/contest.module';

@Module({
  imports: [ContestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
