import { Module } from '@nestjs/common';
import { MongoConnectionModule } from '@kesci/mongo-connection';
import { TypegooseModule } from 'nestjs-typegoose';

import * as Models from './model';

@Module({
  imports: [
    MongoConnectionModule,
    TypegooseModule.forFeature(Object.values(Models)),
  ],
  exports: [TypegooseModule],
})
export class ModelModule {}
