import { Module } from '@nestjs/common'

import { SessionModule } from '../session'
import { AuthenticateController } from './controller'
import { AuthenticateService } from './service'

@Module({
  imports: [SessionModule],
  providers: [AuthenticateService],
  controllers: [AuthenticateController],
})
export class AuthenticateModule {}
