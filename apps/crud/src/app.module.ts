import { NestjsQueryQueryGraphql, NestjsCommon } from '@nest-libs/deps';
import { ModelModule, User } from '@nest-libs/model';

import { UserDTO, UserUpdateDTO, UserCreateDTO } from './dto';
import { createCrudResolver } from './createCrudResolver';

@NestjsCommon.Module({
  imports: [
    NestjsQueryQueryGraphql.NestjsQueryGraphQLModule.forFeature({
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
