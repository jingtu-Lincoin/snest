import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(tel: string, password: string) {
    const user = await this.authService.validateUser({ tel, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
