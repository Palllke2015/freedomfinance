import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './auth.dto';
import { UserModel } from './user.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.email,
      login: dto.login,
      is_active: false,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserByLogin(login: string) {
    return this.userModel.findOne({ login }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.userService.findOneByEmail(email);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return {
      email: user.email,
    };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}