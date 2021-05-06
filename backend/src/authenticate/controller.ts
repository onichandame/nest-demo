import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import {
  AuthenticateDeserializeSessionPattern,
  AuthenticateLoginPattern,
  AuthenticateUpdatePassPattern,
} from '../constants'
import { UserLoginArgs } from '../inputs'
import { AuthenticateService } from './service'

@Controller()
export class AuthenticateController {
  constructor(private authSvc: AuthenticateService) {}

  @MessagePattern(AuthenticateLoginPattern)
  async login(args: UserLoginArgs) {
    return this.authSvc.loginUser(args)
  }

  @MessagePattern(AuthenticateUpdatePassPattern)
  async updatePassword() {}

  @MessagePattern(AuthenticateDeserializeSessionPattern)
  async deserializeSession(sessionKey: string) {
    return this.authSvc.getUserFromSession(sessionKey)
  }
}
