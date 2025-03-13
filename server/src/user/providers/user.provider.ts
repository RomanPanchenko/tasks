import { Injectable } from '@nestjs/common';

import { UserService } from '../services';
import { UserResponseDto } from '../dtos';

@Injectable()
export class UserProvider {
  constructor(
    private readonly userService: UserService,
  ) {}

  async getCurrentUser(userUlid: string): Promise<UserResponseDto> {
    return await this.userService.getByUlid(userUlid);
  }
}
