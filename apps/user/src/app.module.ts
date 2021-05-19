import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { MongoConnectionModule } from '@kesci/mongo-connection';

import { UserModule } from './user';

@Module({
  imports: [
    MongoConnectionModule,
    GraphQLFederationModule.forRoot({ autoSchemaFile: true }),
    UserModule,
  ],
})
export class AppModule {}
