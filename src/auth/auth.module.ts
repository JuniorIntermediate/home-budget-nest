import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './security/jwt.strategy';
import { jwtConstants } from './security/constants';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [
    CoreModule,
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
export class AuthModule {}
