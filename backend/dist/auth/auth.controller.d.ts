import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: AuthDto): Promise<import("@typegoose/typegoose").DocumentType<import("./user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    login({ login, password }: AuthDto): Promise<{
        access_token: string;
    }>;
}
