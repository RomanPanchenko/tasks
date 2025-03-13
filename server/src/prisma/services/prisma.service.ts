import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { userCreationExtension } from '../../user/prisma-extensions';

export type DbConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private extendedClient: PrismaClient;

  constructor(@Inject('DATABASE_CONFIG') private readonly dbConfig: DbConfig) {
    const url = `mysql://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

    super({ datasources: { db: { url } } });

    this.extendedClient = this.applyExtensions();
  }

  private applyExtensions(): PrismaClient {
    return this.$extends(userCreationExtension) as unknown as PrismaClient;
  }

  async onModuleInit() {
    await this.extendedClient.$connect();
  }

  async onModuleDestroy() {
    await this.extendedClient.$disconnect();
  }

  get client(): PrismaClient {
    return this.extendedClient;
  }
}
