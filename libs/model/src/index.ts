import { Module } from '@nestjs/common';
import { MongoConnectionModule } from '@kesci/mongo-connection';

import { UserModule } from './user';
import { CredentialModule } from './credential';
import { JobRecordModule } from './jobRecord';

@Module({
  imports: [
    MongoConnectionModule,
    UserModule,
    CredentialModule,
    JobRecordModule,
  ],
  exports: [UserModule, CredentialModule, JobRecordModule],
})
export class ModelModule {}

// models
export * from './user';
export * from './credential';
export * from './jobRecord';

// supplementary functions
export * from './helpers';
