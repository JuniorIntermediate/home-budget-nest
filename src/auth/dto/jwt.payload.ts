import { ApiResponseProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiResponseProperty()
  email: string;
  @ApiResponseProperty()
  firstName: string;
  @ApiResponseProperty()
  lastName: string;
}
