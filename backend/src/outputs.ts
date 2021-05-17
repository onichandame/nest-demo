import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType({ isAbstract: true })
export class EmptyReply {
  @Field()
  ok: boolean
}

@ObjectType()
export class UserLoginReply {
  @Field()
  session: string
}
