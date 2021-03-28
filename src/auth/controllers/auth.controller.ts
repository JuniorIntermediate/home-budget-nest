import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtGuard } from '../guard/jwt.guard';
import { JwtPayload } from '../dto/jwt.payload';
import { TokenResponse } from '../dto/token.response';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @HttpCode(201)
  @Post('register')
  public async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
  }

  @HttpCode(200)
  @HttpCode(401)
  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  public getProfile(@Request() req: Request & { user: JwtPayload }): JwtPayload {
    return req.user;
  }
}
