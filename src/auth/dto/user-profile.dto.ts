import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/generated-prisma';

export class UserProfileDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;

  constructor(input: Partial<User>) {
    this.id = input.id;
    this.email = input.email;
    this.firstName = input.firstName;
    this.lastName = input.lastName;
  }
}
