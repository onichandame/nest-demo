import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { StatusModule } from '../status'
import { MicroserviceClientModule } from '../microservice'
import { GatewayAuthenticatePlugin } from './authenticate.plugin'

import { UserResolver } from './user.resolver'
import { AuthenticateResolver } from './authenticate.resolver'

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
  providers: [GatewayAuthenticatePlugin, UserResolver, AuthenticateResolver],
})
export class GatewayModule {}
