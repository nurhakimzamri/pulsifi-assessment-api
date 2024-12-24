import { NestFactory } from '@nestjs/core';
import { AppModule } from './app-modules/app/app.module';
import { WinstonLoggerService } from './logger/winston-logger.service';
import morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLoggerService().getLogger(),
  });
  app.setGlobalPrefix('pulsifi-assessment');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  const config = new DocumentBuilder()
    .setTitle('Pulsifi Assessment API')
    .setDescription('Pulsifi Assessment Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('pulsifi-assessment/api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const winstonLoggerService = app.get(WinstonLoggerService);
  const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
      stream: {
        // Configure Morgan to use our custom logger with the http severity
        write: (message) =>
          winstonLoggerService
            .getLogger()
            .child({ label: 'API' })
            .http(message.trim()),
      },
    },
  );
  app.use(morganMiddleware);

  await app.listen(port);
  console.log(`[WEB] Service listening on PORT: ${port}`);
}
bootstrap();
