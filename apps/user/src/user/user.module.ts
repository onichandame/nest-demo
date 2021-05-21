import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';

import { User, UserSchema } from '@kesci/model';
import { UserDTO, UserCreateDTO, UserUpdateDTO } from './dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          { document: User, name: User.name, schema: UserSchema },
        ]),
      ],
      resolvers: [
        {
          DTOClass: UserDTO,
          CreateDTOClass: UserCreateDTO,
          UpdateDTOClass: UserUpdateDTO,
          EntityClass: User,
          enableAggregate: true,
          enableTotalCount: true,
          referenceBy: { key: `_id` },
        },
      ],
    }),
  ],
})
export class UserModule {}
