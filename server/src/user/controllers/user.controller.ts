import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserProvider } from '../providers';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userProvider: UserProvider,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ description: 'Get current user. Response: UserResponseDto object.' })
  @ApiBadRequestResponse({ description: 'Error getting user data.' })
  async getCurrentUser() {
    return await this.userProvider.getCurrentUser('123');
  }
}
