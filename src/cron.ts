
import { CronModule } from './cron-modules/cron/cron.module';
import { NestFactory } from '@nestjs/core';
import { WinstonLoggerService } from './logger/winston-logger.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(CronModule, {
        logger: new WinstonLoggerService().getLogger(),
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    await app.listen(9090);
    console.log(`[CRON] Service has started`);
}
bootstrap();
