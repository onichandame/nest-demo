import { GraphQLFederationModule } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { Context, AuthModule, AuthService } from '@nest-libs/auth';
import { XUserHeader } from '@nest-libs/constants';

export const createFederationModule = () =>
  GraphQLFederationModule.forRootAsync({
    imports: [AuthModule],
    inject: [AuthService],
    useFactory: (auth: AuthService) => {
      return {
        autoSchemaFile: true,
        context: async (raw: {
          req: Request;
          res: Response;
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
