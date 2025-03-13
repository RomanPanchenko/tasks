import * as config from 'config';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services';

const dbConfig = config.get('db');

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: 'DATABASE_CONFIG',
      useValue: dbConfig,
    },
  ],
  exports: [PrismaService, 'DATABASE_CONFIG'],
})
export class PrismaModule {}
