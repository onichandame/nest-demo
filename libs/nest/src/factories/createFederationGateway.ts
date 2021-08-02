import {
  express,
  ApolloGateway,
  NestjsGraphql,
  NestjsCommon,
  NestjsConfig,
} from '@nest-libs/deps';
import { XUserHeader } from '@nest-libs/constants';
import {
  AuthModule,
  AuthService,
  SessionService,
  Context,
} from '@nest-libs/auth';

class BeforeServiceCall extends ApolloGateway.RemoteGraphQLDataSource<Context> {
  async willSendRequest({
    request,
    context,
  }: Parameters<
    NonNullable<
      ApolloGateway.RemoteGraphQLDataSource<Context>['willSendRequest']
    >
  >[0]) {
    if (context.user) {
      request.http?.headers.set(XUserHeader, context.user.id);
    }
  }
}

@NestjsCommon.Module({
  providers: [
    { provide: BeforeServiceCall, useValue: BeforeServiceCall },
    {
      provide: NestjsGraphql.GATEWAY_BUILD_SERVICE,
      inject: [BeforeServiceCall],
      useFactory:
        (BeforeServiceCall) =>
        ({ url }: any) =>
          new BeforeServiceCall({ url }),
    },
  ],
  exports: [NestjsGraphql.GATEWAY_BUILD_SERVICE],
})
class BuildServiceModule {}

export const createFederationGateway = () =>
  NestjsGraphql.GraphQLGatewayModule.forRootAsync({
    imports: [AuthModule, BuildServiceModule, NestjsConfig.ConfigModule],
    inject: [
      SessionService,
      AuthService,
      NestjsConfig.ConfigService,
      NestjsGraphql.GATEWAY_BUILD_SERVICE,
    ],
    useFactory: async (
      session: SessionService,
      auth: AuthService,
      config: NestjsConfig.ConfigService
    ) => {
      return {
        server: {
          path: `/graphql`,
          context: async (raw: {
            req: express.Request;
            res: express.Response;
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
          serviceList: JSON.parse(config.get<string>(`SERVICE_LIST`) || ``),
        },
      };
    },
  });
