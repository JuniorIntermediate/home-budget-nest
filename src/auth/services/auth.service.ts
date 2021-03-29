import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Optional,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from '../../core/repositories/user.repository';
import { RegisterDto } from '../dto/register.dto';
import { User } from '@prisma/client';
import { JwtPayload } from '../dto/jwt.payload';
import * as bcrypt from 'bcrypt';
import { TokenResponse } from '../dto/token.response';
import { PasswordInterface } from '../interface/password.interface';
import { ActivationStatus, UserUpdateParams } from '../../core/schema-types/user.params';
import { MailerService } from '@nestjs-modules/mailer';
import { IS_SMTP_PROVIDER, SENDGRID_EMAIL_FROM, SMTP_FROM, WEB_URL } from '../../core/models/constants';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    @Optional() private readonly mailService: MailerService,
    @Optional() @InjectSendGrid() private readonly sendGridService: SendGridService,
  ) {
  }

  async login(loginDto: LoginDto): Promise<TokenResponse> {
    const user = await this.userRepository.findUserByEmail({ email: loginDto.email });
    if (user && user.activationStatus === ActivationStatus.ACTIVE) {
      const isValidPassword = await this.validatePassword(loginDto.password, user);
      if (isValidPassword) {
        return this.createToken(user);
      }
    }
    throw new UnauthorizedException();
  }

  async register({ email, firstName, lastName, password }: RegisterDto): Promise<void> {
    const user = await this.userRepository.findUserByEmail({ email: email });
    if (user) {
      throw new BadRequestException('User already exist!');
    }
    const { passwordHash, passwordSalt } = await this.hashPassword(password);
    const verificationToken = await this.createEmailToken(email, passwordSalt);
    try {
      await this.sendEmailVerification(email, verificationToken);
      await this.userRepository.createUser({
        email,
        firstName,
        lastName,
        passwordHash,
        passwordSalt,
        verificationToken,
      });
    } catch (error) {
      throw new InternalServerErrorException('There were a problem on user saving.');
    }
  }

  async verifyEmailToken(token: string): Promise<boolean> {
    const user = await this.userRepository.findUserByToken({ verificationToken: token });
    if (user) {
      const updateUser: UserUpdateParams = {
        data: {
          ...user,
          verificationToken: null,
          activationStatus: ActivationStatus.ACTIVE,
        },
        where: { email: user.email },
      };
      await this.userRepository.updateUser(updateUser);
      return true;
    }
    throw new BadRequestException('Token doesn\'t exist or already used.');
  }

  async setNewPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userRepository.findUserByToken({ verificationToken: resetPasswordDto.passwordToken });
    if (user) {
      const { passwordHash, passwordSalt } = await this.hashPassword(resetPasswordDto.password);
      const updateUser: UserUpdateParams = {
        where: { email: user.email },
        data: {
          ...user,
          passwordHash,
          passwordSalt,
          verificationToken: null,
        },
      };
      await this.userRepository.updateUser(updateUser);
      return true;
    }
    throw new BadRequestException('Token doesn\'t exist or already used.');
  }

  async sendEmailForgotPassword(email: string) {
    const user = await this.userRepository.findUserByEmail({ email });
    if (user) {
      const verificationToken = await this.createEmailToken(email, user.passwordSalt);
      try {
        const updateUser: UserUpdateParams = {
          data: {
            ...user,
            verificationToken,
          },
          where: { email },
        };
        await this.sendEmailRemindPassword(email, verificationToken);
        await this.userRepository.updateUser(updateUser);
      } catch (error) {
        throw new InternalServerErrorException('There were a problem while sending email.');
      }
    }
  }

  async findByPayload(jwtPayload: JwtPayload): Promise<User> {
    return this.userRepository.findUserByEmail({ email: jwtPayload.email });
  }

  private validatePassword = async (password: string, { passwordHash, passwordSalt }: User): Promise<boolean> => {
    const generatedHash = await bcrypt.hash(password, passwordSalt);
    return generatedHash === passwordHash;
  };

  private createToken({ email, firstName, lastName }: User): TokenResponse {
    const jwtPayload: JwtPayload = { firstName, lastName, email };
    const accessToken = this.jwtService.sign(jwtPayload);
    return {
      expiresIn: process.env.JWT_EXPIRES,
      accessToken,
    };
  }

  private hashPassword = async (password: string): Promise<PasswordInterface> => {
    const passwordSalt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(password, passwordSalt);
    return { passwordHash, passwordSalt };
  };

  private createEmailToken = async (email: string, salt: string) => {
    return bcrypt.hash(`${email}${((Math.random() * 90000) + 10000).toString()}`, salt);
  };

  private sendEmailVerification = async (email: string, token: string) => {
    const url = `${WEB_URL.base}${WEB_URL.verification}${token}`;
    const emailData = {
      from: IS_SMTP_PROVIDER ? SMTP_FROM : SENDGRID_EMAIL_FROM,
      to: email,
      subject: 'Confirm registration',
      html: `<a href='${url}'>Click here for finish registration</a>`,
    };
    return IS_SMTP_PROVIDER ? this.mailService.sendMail(emailData) : this.sendGridService.send(emailData);
  };

  private sendEmailRemindPassword = async (email: string, token: string) => {
    const url = `${WEB_URL.base}${WEB_URL.forgotPassword}${token}`;
    const emailData = {
      from: IS_SMTP_PROVIDER ? SMTP_FROM : SENDGRID_EMAIL_FROM,
      to: email,
      subject: 'Remind password',
      html: `<a href='${url}'>Click here for reset password</a>`,
    };
    return IS_SMTP_PROVIDER ? this.mailService.sendMail(emailData) : this.sendGridService.send(emailData);
  };
}
