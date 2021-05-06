import { ArgsType, Field } from '@nestjs/graphql'

import { User } from './db'

export type JobArgs = {
  job: string
  async?: boolean
}

@ArgsType()
class SessionedArgs {
  @Field({ nullable: true })
  session?: string
}

@ArgsType()
export class ListArgs extends SessionedArgs {
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
export class UserListArgs extends ListArgs {}

@ArgsType()
export class UserUpdateArgs
  extends SessionedArgs
  implements Partial<Pick<User, 'email' | 'name'>> {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  email?: string
}

@ArgsType()
export class UserLoginArgs implements Pick<User, 'password'> {
  @Field()
  nameOrEmail: string
  @Field()
  password: string
}
