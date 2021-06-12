import { Module } from '@nestjs/common';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';

import * as Models from './models';

const models = Object.values(Models);

const ModelsModule = NestjsQueryTypegooseModule.forFeature(models);

@Module({
  imports: [ModelsModule],
  exports: [ModelsModule],
})
export class ModelModule {}
