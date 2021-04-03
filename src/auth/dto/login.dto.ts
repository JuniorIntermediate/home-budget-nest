import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { TokenResponse } from '@auth/dto/token.response';

@ApiExtraModels(TokenResponse)
export class LoginDto {
  @ApiProperty({
    description: 'Email for user authentication',
  })
  email: string;

  @ApiProperty({
    description: 'Password for user authentication',
  })
  password: string;
}
