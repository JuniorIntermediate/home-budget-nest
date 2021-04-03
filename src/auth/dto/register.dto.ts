import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Email for user authentication.',
    example: 'test@test.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for user authentication.',
    minLength: 8,
    pattern: 'At least one letter, one number and one special character',
    example: 'Qwerty12!',
  })
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'password must contain at least one letter, number and special character'
  })
  password: string;

  @ApiProperty({
    description: 'User first name',
    maxLength: 100,
    example: 'John',
  })
  @MaxLength(100)
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    maxLength: 100,
    example: 'Doe',
  })
  @MaxLength(100)
  lastName: string;
}
