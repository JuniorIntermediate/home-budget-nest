import { DynamicModule, Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { CategoryRepository } from './repositories/category.repository';

const repositories = [
  UserRepository,
  CategoryRepository
];

@Global()
@Module({})
export class CoreModule {
  static register(): DynamicModule {
    return {
      module: CoreModule,
      providers: [PrismaService, ...repositories],
      exports: [PrismaService, ...repositories],
    };
  }
}
