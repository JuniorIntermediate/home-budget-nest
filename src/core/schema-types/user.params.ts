import { Prisma } from 'src/generated-prisma';

export type UserGetByUniqueParams = Prisma.UserWhereUniqueInput;
export type UserGetParams = Prisma.UserWhereInput;
export type UserCreateParams = Prisma.UserCreateInput;

export type UserUpdateParams = {
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput
}

export enum ActivationStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  DISABLED = 'DISABLED'
}
