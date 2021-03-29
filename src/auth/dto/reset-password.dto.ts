import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Password token get from email.',
  })
  passwordToken: string;

  @ApiProperty({
    description: 'New password',
  })
  password: string;
}
