import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { ModelModule, User } from '@nest-libs/model';
import { Module } from '@nestjs/common';

import { UserDTO, UserUpdateDTO, UserCreateDTO } from './dto';
import { createCrudResolver } from './createCrudResolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [ModelModule],
      resolvers: [
        createCrudResolver({
          EntityClass: User,
          DTOClass: UserDTO,
          read: true,
          create: UserCreateDTO,
          update: UserUpdateDTO,
          primaryKey: `_id`,
        }),
      ],
    }),
  ],
})
export class AppModule {}
