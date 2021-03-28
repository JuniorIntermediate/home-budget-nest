import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtGuard } from '../guard/jwt.guard';
import { JwtPayload } from '../dto/jwt.payload';
import { TokenResponse } from '../dto/token.response';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestUserModel } from '../../core/models/request-user.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  @HttpCode(201)
  @HttpCode(400)
  @ApiCreatedResponse({ description: 'The user has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Provided user already exist in app.' })
  public async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  @HttpCode(401)
  @ApiOkResponse({ description: 'The user has been successfully logged in', type: TokenResponse })
  @ApiUnauthorizedResponse({ description: 'Provided data doesn\'t exist in database.' })
  public async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  @HttpCode(200)
  @HttpCode(401)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The logged user information stored in JWT', type: JwtPayload,
  })
  @ApiUnauthorizedResponse({ description: 'User are not logged in' })
  public getProfile(@Request() req: RequestUserModel): JwtPayload {
    return req.user;
  }
}
