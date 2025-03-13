import { Module, Logger } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.gql'], // This tells NestJS to load all .gql files
      playground: true,
      debug: true,
    }),
    MulterModule.register(),
    PrismaModule,
    UserModule,
  ],
  providers: [Logger],
  exports: [],
})

export class AppModule {

}
