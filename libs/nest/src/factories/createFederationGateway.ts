import { GraphQLGatewayModule, GATEWAY_BUILD_SERVICE } from '@nestjs/graphql';
import { AuthModule, AuthService, BuildServiceModule } from '@kesci/auth';
import { MongoConnectionModule } from '@kesci/mongo-connection';

export const createFederationGateway = () =>
  GraphQLGatewayModule.forRootAsync({
    imports: [MongoConnectionModule, AuthModule, BuildServiceModule],
    inject: [AuthService, GATEWAY_BUILD_SERVICE],
    useFactory: async (auth: AuthService) => {
      return {
        server: {
          path: `/graphql`,
          context: async ({ req }) => {
            const user = await auth.parseUserAtGateway(req);
            return { user, req };
          },
        },
        gateway: {
          serviceList: [{ name: `user`, url: `http://localhost:3001/graphql` }],
        },
      };
    },
  });
