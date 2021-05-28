import { Module } from '@nestjs/common';
import { decode, AuthModule, AuthService } from '@kesci/auth';
import { Request } from 'express';
import { GraphQLGatewayModule, GATEWAY_BUILD_SERVICE } from '@nestjs/graphql';
import { MongoConnectionModule } from '@kesci/mongo-connection';

import { BuildServiceModule } from './buildService';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      imports: [MongoConnectionModule, AuthModule, BuildServiceModule],
      inject: [AuthService, GATEWAY_BUILD_SERVICE],
      useFactory: async (auth: AuthService) => {
        return {
          server: {
            path: `/graphql`,
            context: async ({ req }: { req: Request }) => {
              const authHeader = req.header(`authorization`);
              if (authHeader) {
                const token = authHeader.split(`Bearer `)[1];
                if (token) {
                  const { id } = await decode(token);
                  const user = await auth.getUser(id);
                  return { user };
                }
              }
            },
          },
          gateway: {
            serviceList: [
              { name: `user`, url: `http://localhost:3001/graphql` },
            ],
          },
        };
      },
    }),
  ],
})
export class AppModule {}
