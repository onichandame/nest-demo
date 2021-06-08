import { Module } from '@nestjs/common';
import { MongoConnectionModule } from '@kesci/mongo-connection';

import * as Schemes from './scheme';

@Module({
  imports: [MongoConnectionModule, ...Object.values(Schemes)],
})
export class AppModule {}
