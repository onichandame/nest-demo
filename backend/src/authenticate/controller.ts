import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { AuthenticateLoginPattern } from '../constants'
import { UserLoginArgs } from '../types'
import { AuthenticateService } from './service'

@Controller()
export class AuthenticateController {
  constructor(private authSvc: AuthenticateService) {}
  @MessagePattern(AuthenticateLoginPattern)
  async login(args: UserLoginArgs) {
    return this.authSvc.loginUser(args)
  }
}
