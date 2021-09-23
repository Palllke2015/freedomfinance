"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("./auth.constants");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./guards/local-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto) {
        const oldUserEmail = await this.authService.findUserByEmail(dto.email);
        const oldUserLogin = await this.authService.findUserByLogin(dto.login);
        if (oldUserEmail || oldUserLogin) {
            if (oldUserEmail) {
                throw new common_1.BadRequestException(auth_constants_1.EMAIL_ALREADY_USED);
            }
            throw new common_1.BadRequestException(auth_constants_1.LOGIN_ALREADY_USED);
        }
        return this.authService.createUser(dto);
    }
    async login({ login, password }) {
        console.log('work');
        const { email } = await this.authService.validateUser(login, password);
        return this.authService.login(email);
    }
};
__decorate([
    common_1.UsePipes(new common_1.ValidationPipe()),
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.HttpCode(200),
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map