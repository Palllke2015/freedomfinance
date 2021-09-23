import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EMAIL_ALREADY_USED, LOGIN_ALREADY_USED } from './auth.constants';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUserEmail = await this.authService.findUserByEmail(dto.email);
    const oldUserLogin = await this.authService.findUserByLogin(dto.login);

    if (oldUserEmail || oldUserLogin) {
      if (oldUserEmail) {
        throw new BadRequestException(EMAIL_ALREADY_USED);
      }
      throw new BadRequestException(LOGIN_ALREADY_USED);
    }

    return this.authService.createUser(dto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    console.log('work');

    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }
}
