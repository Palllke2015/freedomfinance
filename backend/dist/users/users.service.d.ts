import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/auth/user.model';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: ModelType<UserModel>);
    findOneByEmail(email: string): Promise<import("@typegoose/typegoose/lib/types").DocumentType<UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    findUserByLogin(login: string): Promise<import("@typegoose/typegoose/lib/types").DocumentType<UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
}
