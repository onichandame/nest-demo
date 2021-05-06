import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class UserLoginReply {
  @Field()
  ok: boolean
  @Field({ nullable: true })
  session?: string
  @Field({ nullable: true })
  reason?: string
}
