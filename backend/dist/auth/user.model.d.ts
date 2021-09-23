import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    email: string;
    login: string;
    passwordHash: string;
    is_active: boolean;
}
