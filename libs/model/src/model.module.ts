import { Module } from '@nestjs/common';
import { ConnectionModule } from './connection';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';

import * as Models from './models';

const models = Object.values(Models);

const ModelsModule = NestjsQueryTypegooseModule.forFeature(models);

@Module({
  imports: [ConnectionModule.forRoot(), ModelsModule],
  exports: [ModelsModule],
})
export class ModelModule {}
