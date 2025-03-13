import { Module } from '@nestjs/common';
import { UserProvider } from './providers';
import { UserService } from './services';
import { UserController } from './controllers';
import { UserResolver } from './resolvers';

@Module({
  controllers: [
    UserController,
  ],
  providers: [
    UserProvider,
    UserService,
    UserResolver,
  ],
  exports: [
    UserProvider,
    UserService,
  ],
})
export class UserModule {}
