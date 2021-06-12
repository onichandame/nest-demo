import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { ModelModule, User } from '@kesci/model';
import { MongoConnectionModule } from '@kesci/mongo-connection';
import { Module } from '@nestjs/common';

import { UserDTO } from './user';
import { createCrudResolver } from './createCrudResolver';

@Module({
  imports: [
    MongoConnectionModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [ModelModule],
      resolvers: [
        createCrudResolver({
          EntityClass: User,
          DTOClass: UserDTO,
          read: true,
          primaryKey: `_id`,
        }),
      ],
    }),
  ],
})
export class AppModule {}
