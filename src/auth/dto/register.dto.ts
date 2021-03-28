import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Email for user authentication.',
    example: 'test@test.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password for user authentication.',
    minLength: 8,
    pattern: 'At least one letter and one number',
    example: 'Qwerty12',
  })
  password: string;

  @ApiProperty({
    description: 'User first name',
    maxLength: 100,
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    maxLength: 100,
    example: 'Doe',
  })
  lastName: string;
}
