import { Module } from '@nestjs/common';
import { MongoConnectionModule } from '@kesci/mongo-connection';
import { TypegooseModule } from 'nestjs-typegoose';

import * as Models from './db';

@Module({
  imports: [
    MongoConnectionModule,
    TypegooseModule.forFeature(Object.values(Models)),
  ],
  exports: [TypegooseModule],
})
export class DbModelModule {}
