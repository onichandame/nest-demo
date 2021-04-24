import { Module } from '@nestjs/common'

import { UserService } from './service'
import { UserController } from './controller'

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
