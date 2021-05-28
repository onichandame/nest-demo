import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { MongoConnectionModule } from '@kesci/mongo-connection';

import { UserModule } from './user';

@Module({
  imports: [
    MongoConnectionModule,
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => {
        const userStr = req.header(`x-kesci-user`);
        if (userStr) {
          return JSON.parse(userStr);
        }
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
