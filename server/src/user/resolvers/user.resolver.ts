import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from '../services';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Query('user')
  async getUser(@Args('ulid', { type: () => ID }) ulid: string) {
    return this.userService.getUser(ulid);
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: any) {
    return this.userService.createUser(input);
  }

  @Mutation('updateUser')
  async updateUser(
    @Args('ulid', { type: () => ID }) ulid: string,
    @Args('input') input: any,
  ) {
    return this.userService.updateUser(ulid, input);
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('ulid', { type: () => ID }) ulid: string) {
    return this.userService.deleteUser(ulid);
  }
}
