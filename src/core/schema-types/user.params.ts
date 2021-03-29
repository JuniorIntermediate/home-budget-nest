import { Prisma } from '@prisma/client';

export type UserUpdateParams = {
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput
}
export enum ActivationStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  DISABLED = 'DISABLED'
}
