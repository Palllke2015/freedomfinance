import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(login: string, password: string): Promise<any> {
    console.log('user');
    const user = await this.authService.validateUser(login, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
