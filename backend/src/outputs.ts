import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class UserLoginReply {
  @Field()
  session: string
}
