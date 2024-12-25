import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonLoggerService } from 'src/logger/winston-logger.service';
import { ConfigModule } from '@nestjs/config';
import { FlightModule } from '../flight/flight.module';
import { AuthModule } from '../auth/auth.module';
// import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    // MikroOrmModule.forRoot(),
    ConfigModule.forRoot({}),
    FlightModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, WinstonLoggerService],
})
export class AppModule {}
