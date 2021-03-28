import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from '../../core/repositories/user.repository';
import { RegisterDto } from '../dto/register.dto';
import { User } from '@prisma/client';
import { JwtPayload } from '../dto/jwt.payload';
import * as bcrypt from 'bcrypt';
import { TokenResponse } from '../dto/token.response';
import { PasswordInterface } from '../interface/password.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userRepository: UserRepository) {
  }

  async login(loginDto: LoginDto): Promise<TokenResponse> {
    const user = await this.userRepository.findUserByEmail({ email: loginDto.email });
    if (user) {
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
    await this.userRepository.createUser({ email, firstName, lastName, passwordHash, passwordSalt });
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
}
