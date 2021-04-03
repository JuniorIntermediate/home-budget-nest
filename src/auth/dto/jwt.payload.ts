import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiProperty()
  id: number;
}
