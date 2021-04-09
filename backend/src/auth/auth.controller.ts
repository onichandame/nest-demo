import { Controller } from '@nestjs/common'
import { Payload, MessagePattern } from '@nestjs/microservices'

import { RoleAction, ServiceName, SEP1 } from '../constants'
import { AuthService } from './auth.service'

type AuthenticateRequest = {
  source: string
  action: RoleAction
  target: string
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @MessagePattern([ServiceName.AUTH, `authenticate`].join(SEP1))
  authenticate(@Payload() payload: AuthenticateRequest) {
    return this.authService.authenticate(
      payload.source,
      payload.action,
      payload.target
    )
  }
}
