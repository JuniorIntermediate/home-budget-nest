import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserUpdateParams } from '../schema-types/user.params';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async findUserByEmail(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }

  async findUserByToken(where: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateUser(props: UserUpdateParams): Promise<User> {
    return this.prisma.user.update(props);
  }
}
