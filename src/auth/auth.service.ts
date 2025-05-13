import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  UserDto,
  LoginResponseDto,
  JwtPayloadDto,
} from '../shared/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UserDto | null> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(
        plainTextPassword,
        user.password,
      );

      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error('Validation error:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(user: UserDto): Promise<LoginResponseDto> {
    try {
      const payload: JwtPayloadDto = {
        email: user.email,
        sub: user.id,
        isShipyardOwner: user.isShipyardOwner,
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          isShipyardOwner: user.isShipyardOwner,
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new UnauthorizedException('Failed to generate token');
    }
  }

  async register(userData: any) {
    try {
      const existingUser = await this.usersService.findOneByEmail(
        userData.email,
      );
      if (existingUser) {
        throw new UnauthorizedException('User already exists');
      }

      // Create new user with hashed password
      const user = await this.usersService.create(userData);
      const { password, ...result } = user;
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
}
