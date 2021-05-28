import { Module } from '@nestjs/common';
import { jwtToken } from '@kesci/constants';
import { JwtModule } from '@nestjs/jwt';
import { ModelModule } from '@kesci/model';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    ModelModule,
    PassportModule,
    JwtModule.register({ secret: jwtToken, signOptions: { expiresIn: `30d` } }),
  ],
  providers: [AuthService, AuthStrategy],
})
export class AuthModule {}
