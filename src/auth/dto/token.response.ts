import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({
    description: 'JWT token expiration time',
  })
  expiresIn: string;

  @ApiProperty({
    description: 'Bearer token for authorize requests',
  })
  accessToken: string;
}
