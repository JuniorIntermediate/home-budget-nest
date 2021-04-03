import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Optional,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, LoginDto, RegisterDto, ResetPasswordDto, TokenResponse, UserProfileDto } from '@auth/dto';
import { UserRepository } from '@core/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { PasswordInterface } from '@auth/interfaces/password.interface';
import { ActivationStatus, UserUpdateParams } from '@core/schema-types/user.params';
import { MailerService } from '@nestjs-modules/mailer';
import { IS_SMTP_PROVIDER, SENDGRID_EMAIL_FROM, SMTP_FROM, WEB_URL } from '@core/models/constants';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { PayerRepository } from '@core/repositories/payer.repository';
import { Mapper } from '@core/factories/mapper';
import { User } from 'src/generated-prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly payerRepository: PayerRepository,
    private readonly mapper: Mapper,
    @Optional() private readonly mailService: MailerService,
    @Optional() @InjectSendGrid() private readonly sendGridService: SendGridService,
  ) {
  }

  async login(loginDto: LoginDto): Promise<TokenResponse> {
    const user = await this.userRepository.findUserByUniqueField({ email: loginDto.email });
    if (user && user.activationStatus === ActivationStatus.ACTIVE) {
      const isValidPassword = await this.validatePassword(loginDto.password, user);
      if (isValidPassword) {
        return this.createToken(user);
      }
    }
    throw new UnauthorizedException();
  }

  async register({ email, firstName, lastName, password }: RegisterDto): Promise<void> {
    const user = await this.userRepository.findUserByUniqueField({ email: email });
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
      throw new InternalServerErrorException('There was a problem on user saving.');
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
      const updatedUser = await this.userRepository.updateUser(updateUser);
      const name = `${updatedUser.firstName} ${updatedUser.lastName}`;
      await this.payerRepository.createPayer({
        name,
        user: {
          connect: {
            email: user.email,
          },
        },
      });
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
    const user = await this.userRepository.findUserByUniqueField({ email });
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

  async findByPayload(jwtPayload: JwtPayload): Promise<UserProfileDto> {
    const user = await this.userRepository.findUserByUniqueField({ id: jwtPayload.id });
    return this.mapper.mapToDto(user, UserProfileDto);
  }

  private validatePassword = async (password: string, { passwordHash, passwordSalt }: User): Promise<boolean> => {
    const generatedHash = await bcrypt.hash(password, passwordSalt);
    return generatedHash === passwordHash;
  };

  private createToken({ id }: User): TokenResponse {
    const jwtPayload: JwtPayload = { id };
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
