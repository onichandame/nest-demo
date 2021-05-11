import { Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'

import {
  AuthenticateDeserializeSessionPattern,
  AuthenticateLoginPattern,
  AuthenticateLogoutPattern,
  AuthenticateUpdatePassPattern,
} from '../constants'
import { UserLoginArgs, UserLogoutArgs } from '../inputs'
import { AuthenticateService } from './service'

@Controller()
export class AuthenticateController {
  constructor(private authSvc: AuthenticateService) {}

  @MessagePattern(AuthenticateLoginPattern)
  async login(args: UserLoginArgs) {
    try {
      return await this.authSvc.loginUser(args)
    } catch (e) {
      throw new RpcException(e.message)
    }
  }

  @MessagePattern(AuthenticateLogoutPattern)
  async logout(args: UserLogoutArgs) {
    try {
      return await this.authSvc.logoutUser(args)
    } catch (e) {
      throw new RpcException(e.message)
    }
  }

  @MessagePattern(AuthenticateUpdatePassPattern)
  async updatePassword() {}

  @MessagePattern(AuthenticateDeserializeSessionPattern)
  async deserializeSession(sessionKey: string) {
    try {
      return await this.authSvc.getUserFromSession(sessionKey)
    } catch (e) {
      throw new RpcException(e.message)
    }
  }
}
