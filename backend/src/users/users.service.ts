import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/auth/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserByLogin(login: string) {
    return this.userModel.findOne({ login }).exec();
  }
}
