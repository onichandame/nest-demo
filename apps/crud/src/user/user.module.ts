import {
  NestjsQueryQueryGraphql,
  NestjsQueryQueryTypegoose,
  NestjsCommon,
} from '@nest-libs/deps';
import { ModelModule, User } from '@nest-libs/model';

import { UserDTO } from './user.dto';
import { UserResolver } from './user.resolver';
import { UserCreateDTO } from './user.create-dto';
import { UserUpdateDTO } from './user.update-dto';

@NestjsCommon.Module({
  providers: [UserResolver],
  imports: [
    ModelModule,
    NestjsQueryQueryGraphql.NestjsQueryGraphQLModule.forFeature({
      imports: [
        ModelModule,
        NestjsQueryQueryTypegoose.NestjsQueryTypegooseModule.forFeature([User]),
      ],
      resolvers: [
        {
          EntityClass: User,
          DTOClass: UserDTO,
          CreateDTOClass: UserCreateDTO,
          UpdateDTOClass: UserUpdateDTO,
          delete: { disabled: true },
          referenceBy: { key: `id` },
        },
      ],
    }),
  ],
})
export class UserModule {}
