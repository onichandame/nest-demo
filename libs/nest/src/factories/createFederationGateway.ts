import { GraphQLGatewayModule, GATEWAY_BUILD_SERVICE } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { Request, Response } from 'express';
import { XUserHeader } from '@nest-libs/constants';
import {
  AuthModule,
  AuthService,
  SessionService,
  Context,
} from '@nest-libs/auth';

class BeforeServiceCall extends RemoteGraphQLDataSource<Context> {
  async willSendRequest({
    request,
    context,
  }: Parameters<
    NonNullable<RemoteGraphQLDataSource<Context>['willSendRequest']>
  >[0]) {
    if (context.user) {
      request.http?.headers.set(XUserHeader, context.user.id);
    }
  }
}

@Module({
  providers: [
    { provide: BeforeServiceCall, useValue: BeforeServiceCall },
    {
      provide: GATEWAY_BUILD_SERVICE,
      inject: [BeforeServiceCall],
      useFactory:
        (BeforeServiceCall) =>
        ({ url }: any) =>
          new BeforeServiceCall({ url }),
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
class BuildServiceModule {}

export const createFederationGateway = () =>
  GraphQLGatewayModule.forRootAsync({
    imports: [AuthModule, BuildServiceModule],
    inject: [SessionService, AuthService, GATEWAY_BUILD_SERVICE],
    useFactory: async (session: SessionService, auth: AuthService) => {
      return {
        server: {
          path: `/graphql`,
          context: async (raw: {
            req: Request;
            res: Response;
          }): Promise<Context> => {
            if (raw.req.headers.authorization) {
              const jwt = raw.req.headers.authorization.split(`Bearer `)[1];
              if (jwt) {
                const sess = await session.deserialize(jwt);
                const user = await auth.findUser(sess.user);
                return { ...raw, user };
              }
            }
            return { ...raw, user: undefined };
          },
        },
        gateway: {
          serviceList: [
            { name: `crud`, url: `http://localhost:3001/graphql` },
            { name: `jobRunner`, url: `http://localhost:3002/graphql` },
          ],
        },
      };
    },
  });
