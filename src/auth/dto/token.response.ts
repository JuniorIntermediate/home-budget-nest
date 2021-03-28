import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiResponseProperty()
  @ApiProperty({
    description: 'JWT token expiration time',
  })
  expiresIn: string;

  @ApiResponseProperty()
  @ApiProperty({
    description: 'Bearer token for authorize requests',
  })
  accessToken: string;
}
