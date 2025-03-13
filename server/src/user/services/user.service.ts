import { Injectable } from '@nestjs/common';
import { Prisma, UserEntity } from '@prisma/client';
import { PrismaService } from '../../prisma/services';
import { UserResponseDto } from '../dtos';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getByUlid(ulid: string): Promise<UserResponseDto> {
    console.log(ulid);
    return {
      ulid: '01JP7QRN7NY7V82FSNRGAPHETR',
      email: 'user@test.com',
      first_name: 'Sitara',
      last_name: 'Thegra',
    } as UserResponseDto;
  }

  async getUsers() {
    return this.prisma.client.userEntity.findMany();
  }

  async getUser(ulid: string) {
    return this.prisma.client.userEntity.findUnique({ where: { ulid } });
  }

  async createUser(input: Prisma.UserEntityCreateInput): Promise<UserEntity> {
    return this.prisma.client.userEntity.create({ data: input });
  }

  async updateUser(ulid: string, input: any) {
    return this.prisma.client.userEntity.update({ where: { ulid }, data: input });
  }

  async deleteUser(ulid: string) {
    return this.prisma.client.userEntity.delete({ where: { ulid } });
  }
}
