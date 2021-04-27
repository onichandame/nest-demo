import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { StatusModule } from '../status'
import { MicroserviceClientModule } from '../microservice'
import { UserResolver } from './user.resolver'

@Module({
  imports: [
    MicroserviceClientModule,
    StatusModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      subscriptions: { path: `/graphql/ws` },
    }),
  ],
  providers: [UserResolver],
})
export class GatewayModule {}
