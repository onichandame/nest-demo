import { ObjectID, ObjectIdColumn } from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Base {
  @Field(() => String)
  @ObjectIdColumn()
  id: ObjectID
}
