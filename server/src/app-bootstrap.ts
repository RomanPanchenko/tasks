import helmet from 'helmet';
import * as express from 'express';
import * as config from 'config';
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { createLogger } from './_common/lib/logger/winston';
import { API_GLOBAL_PREFIX, IS_PRODUCTION } from './_common/constants';
import { AllExceptionsFilter } from './_common/exception-filter';
import { corsOptions } from './_common/lib/cors';

const runSwagger = (app: INestApplication) => {
  if (!IS_PRODUCTION) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag(API_GLOBAL_PREFIX)
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('apidoc', app, document);
  }
};

export const createApp = async (): Promise<INestApplication> => {
  const loggerInstance = createLogger();
  const loggerService = WinstonModule.createLogger({ instance: loggerInstance });

  const httpsParamsObject = config.get('https_proto')
    ? {
      httpsOptions: {
        key: config.get('https.key'),
        cert: config.get('https.cert'),
      },
    }
    : {};

  const app = await NestFactory.create(AppModule, { ...httpsParamsObject, logger: loggerService });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.enableCors(corsOptions);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.setGlobalPrefix(API_GLOBAL_PREFIX);

  runSwagger(app);

  return app;
};
