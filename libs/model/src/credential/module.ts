import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Credential, CredentialSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: CredentialSchema, name: Credential.name },
    ]),
  ],
  exports: [MongooseModule],
})
export class CredentialModule {}
