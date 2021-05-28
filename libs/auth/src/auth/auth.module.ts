import { Module } from '@nestjs/common';
import { ModelModule } from '@kesci/model';

import { AuthService } from './auth.service';

@Module({
  imports: [ModelModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
