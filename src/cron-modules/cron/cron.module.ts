import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
// import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // MikroOrmModule.forRoot(),
    ConfigModule.forRoot({}),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [CronService],
})
export class CronModule {}
