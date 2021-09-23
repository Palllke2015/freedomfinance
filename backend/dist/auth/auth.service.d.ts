import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthDto } from './auth.dto';
import { UserModel } from './user.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private readonly userModel;
    private readonly userService;
    private readonly jwtService;
    constructor(userModel: ModelType<UserModel>, userService: UsersService, jwtService: JwtService);
    createUser(dto: AuthDto): Promise<import("@typegoose/typegoose/lib/types").DocumentType<UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    findUserByEmail(email: string): Promise<import("@typegoose/typegoose/lib/types").DocumentType<UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    findUserByLogin(login: string): Promise<import("@typegoose/typegoose/lib/types").DocumentType<UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>>;
    login(email: string): Promise<{
        access_token: string;
    }>;
}
