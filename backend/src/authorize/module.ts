import { Module } from '@nestjs/common'

import { AuthorizeController } from './controller'

@Module({ controllers: [AuthorizeController] })
export class AuthorizeModule {}
