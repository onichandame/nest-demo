import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { StatusModule } from './status'

@Module({
  imports: [StatusModule, GraphQLModule.forRoot({ autoSchemaFile: true })],
})
export class GatewayModule {}
