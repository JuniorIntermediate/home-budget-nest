import { Injectable } from '@nestjs/common';
import { User } from 'src/generated-prisma';
import { PrismaService } from '@core/prisma.service';
import {
  UserCreateParams,
  UserGetByUniqueParams,
  UserGetParams,
  UserUpdateParams,
} from '@core/schema-types/user.params';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async findUserByUniqueField(where: UserGetByUniqueParams): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }

  async findUserByToken(where: UserGetParams): Promise<User | null> {
    return this.prisma.user.findFirst({
      where,
    });
  }

  async createUser(data: UserCreateParams): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateUser(props: UserUpdateParams): Promise<User> {
    return this.prisma.user.update(props);
  }
}
