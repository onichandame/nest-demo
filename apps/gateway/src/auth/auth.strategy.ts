import { PassportStrategy } from '@nestjs/passport';
import { jwtToken } from '@kesci/constants';
import { ExtractJwt, StrategyOptions, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private svc: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtToken,
    } as StrategyOptions);
  }

  async validate(payload: { username: string; sub: string }) {
    return this.svc.findUser(payload.sub);
  }
}
