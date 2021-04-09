import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Entities } from '../../model'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: Object.values(Entities),
      type: `mongodb`,
      url: process.env.MONGO_URL || `mongodb://localhost:27017/tmp`,
    }),
  ],
})
export class DbModule {}
