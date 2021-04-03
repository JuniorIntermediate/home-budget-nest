import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '@auth/services/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '@auth/dto';
import { jwtConstants } from '@core/models/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const user = await this.authService.findByPayload(payload);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return payload;
  }
}
