import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { UserRegisterArgs } from '../types'
import { UserRegisterPattern, UserListPattern } from '../constants'
import { UserService } from './service'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern(UserRegisterPattern)
  register(args: UserRegisterArgs) {
    return this.userService.register(args)
  }

  @MessagePattern(UserListPattern)
  list() {
    return this.userService.list()
  }
}
