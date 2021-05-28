import { Module } from '@nestjs/common';

import { UserModule } from './user';
import { CredentialModule } from './credential';

@Module({
  imports: [UserModule, CredentialModule],
  exports: [UserModule, CredentialModule],
})
export class ModelModule {}

// models
export * from './user';
export * from './credential';

// supplementary functions
export * from './helpers';
