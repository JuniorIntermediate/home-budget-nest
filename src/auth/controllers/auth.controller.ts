import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtGuard } from '../guard/jwt.guard';
import { JwtPayload } from '../dto/jwt.payload';
import { TokenResponse } from '../dto/token.response';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestUserModel } from '../../core/models/request-user.model';
import { ResetPasswordDto } from '../dto/reset-password.dto';

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
  @ApiInternalServerErrorResponse({ description: 'Unexpected error while sending email.' })
  public async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @ApiOkResponse({ description: 'The user has been successfully logged in', type: TokenResponse })
  @ApiUnauthorizedResponse({ description: 'Provided data doesn\'t exist in database.' })
  public async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The logged user information stored in JWT', type: JwtPayload })
  @ApiUnauthorizedResponse({ description: 'User are not logged in' })
  public getProfile(@Request() req: RequestUserModel): JwtPayload {
    return req.user;
  }

  @Get('verifyEmailToken/:token')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOkResponse({ description: 'Token was good and user has been successfully verified' })
  @ApiBadRequestResponse({ description: 'Token has been already used or was invalid.' })
  public async getVerifyToken(@Param('token') token: string): Promise<boolean> {
    return await this.authService.verifyEmailToken(token);
  }

  @Get('forgot-password/:email')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  @ApiOkResponse({ description: 'Email was send properly.' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error while sending email.' })
  public async getForgotPasswordToken(@Param('email') email: string): Promise<void> {
    await this.authService.sendEmailForgotPassword(email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOkResponse({ description: 'Password has been successfully changed.' })
  @ApiBadRequestResponse({ description: 'Token has been already used or was invalid.' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error while sending email.' })
  public async postResetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    return await this.authService.setNewPassword(resetPasswordDto);
  }
}
