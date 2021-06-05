import { Module } from '@nestjs/common';
import { MongoConnectionModule } from '@kesci/mongo-connection';

import { UserModule } from './user';
import { JobRecordModule } from './jobRecords';

const CrudModules = [UserModule, JobRecordModule];

@Module({
  imports: [MongoConnectionModule, ...CrudModules],
})
export class AppModule {}
