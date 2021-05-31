import { Module } from '@nestjs/common';
import { MongoConnectionModule } from '@kesci/mongo-connection';

import { UserModule } from './user';

@Module({
  imports: [MongoConnectionModule, UserModule],
})
export class AppModule {}
