import { Module } from '@nestjs/common'

import { DbConnectionModule } from './connection'
import { DbModelModule } from './model'

@Module({ imports: [DbConnectionModule, DbModelModule] })
export class DbModule {}
