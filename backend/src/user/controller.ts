import { Inject, Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { UserRegisterArgs } from '../types'
import { UserService } from './service'

@Controller()
export class UserController {
  constructor(@Inject() private userService: UserService) {}
  @MessagePattern({ cmd: `register` })
  register(args: UserRegisterArgs) {
    return this.userService.register(args)
  }
}
