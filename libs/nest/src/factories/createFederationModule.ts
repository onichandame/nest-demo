import { express, NestjsGraphql } from '@nest-libs/deps';
import { Context, AuthModule, AuthService } from '@nest-libs/auth';
import { XUserHeader } from '@nest-libs/constants';

export const createFederationModule = () =>
  NestjsGraphql.GraphQLFederationModule.forRootAsync({
    imports: [AuthModule],
    inject: [AuthService],
    useFactory: (auth: AuthService) => {
      return {
        autoSchemaFile: true,
        context: async (raw: {
          req: express.Request;
          res: express.Response;
        }): Promise<Context> => {
          const id = raw.req.headers[XUserHeader];
          if (!!id && typeof id === `string`) {
            const user = await auth.findUser(id);
            return { ...raw, user };
          }
          return { user: undefined, ...raw };
        },
      };
    },
  });
