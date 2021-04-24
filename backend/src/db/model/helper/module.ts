import { Module } from '@nestjs/common'

import { DbModelHelperService } from './service'

@Module({ providers: [DbModelHelperService], exports: [DbModelHelperService] })
export class DbModelHelperModule {}
