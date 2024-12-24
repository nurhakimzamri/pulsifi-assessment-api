import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonLoggerService } from 'src/logger/winston-logger.service';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({}),
  ],
  controllers: [AppController],
  providers: [AppService, WinstonLoggerService],
})
export class AppModule { }
