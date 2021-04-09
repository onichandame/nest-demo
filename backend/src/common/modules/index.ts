import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DbModule } from './db.module'
import { Model } from '../../model'

@Global()
@Module({ imports: [DbModule, ConfigModule.forRoot(), Model] })
export class CommonModule {}
