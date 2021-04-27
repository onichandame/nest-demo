import { User } from './db'
import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class ListArgs {
  @Field({ nullable: true })
  page?: number
  @Field({ nullable: true })
  perPage?: number
  @Field({ nullable: true })
  noPaging?: boolean
}

@ArgsType()
export class UserRegisterArgs implements Pick<User, 'name' | 'email'> {
  @Field()
  email!: string
  @Field()
  name!: string
}

@ArgsType()
export class UserUpdateArgs implements Partial<Pick<User, 'email' | 'name'>> {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  email?: string
}
