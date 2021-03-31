import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { UserCreateParams, UserGetByUniqueParams, UserGetParams, UserUpdateParams } from '../schema-types/user.params';

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
