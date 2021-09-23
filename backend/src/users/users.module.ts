import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from 'src/auth/user.model';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
