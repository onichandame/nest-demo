import { Module } from '@nestjs/common'

import { AuthService } from './service'

@Module({ imports: [], providers: [AuthService] })
export class AuthModule {}
