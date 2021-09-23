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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_model_1 = require("./user.model");
const bcryptjs_1 = require("bcryptjs");
const auth_constants_1 = require("./auth.constants");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(userModel, userService, jwtService) {
        this.userModel = userModel;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async createUser(dto) {
        const salt = await bcryptjs_1.genSalt(10);
        const newUser = new this.userModel({
            email: dto.email,
            login: dto.login,
            is_active: false,
            passwordHash: await bcryptjs_1.hash(dto.password, salt),
        });
        return newUser.save();
    }
    async findUserByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findUserByLogin(login) {
        return this.userModel.findOne({ login }).exec();
    }
    async validateUser(email, password) {
        const user = await this.userService.findOneByEmail(email);
        console.log(user);
        if (!user) {
            throw new common_1.UnauthorizedException(auth_constants_1.USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await bcryptjs_1.compare(password, user.passwordHash);
        if (!isCorrectPassword) {
            throw new common_1.UnauthorizedException(auth_constants_1.WRONG_PASSWORD_ERROR);
        }
        return {
            email: user.email,
        };
    }
    async login(email) {
        const payload = { email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_typegoose_1.InjectModel(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map