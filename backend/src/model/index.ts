import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './user'
import { Role } from './role'

export const Entities = { User, Role }

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(Entities))],
  exports: [TypeOrmModule],
})
export class Model {}
