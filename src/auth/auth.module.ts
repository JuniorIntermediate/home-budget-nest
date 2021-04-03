import { Module } from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';
import { AuthController } from '@auth/controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@auth/security/jwt.strategy';
import { jwtConstants } from '@core/models/constants';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expirationTime,
      },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {
}
