import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as Schemas from './schemas'

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(Schemas))],
})
export class DbModelModule {}
