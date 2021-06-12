import { GraphQLFederationModule } from '@nestjs/graphql';
//import { AuthModule, AuthService } from '@kesci/auth';

export const createFederationModule = () =>
  GraphQLFederationModule.forRootAsync({
    //imports: [AuthModule],
    //inject: [AuthService],
    useFactory: (/*auth: AuthService*/) => {
      return {
        autoSchemaFile: true,
        //context: async ({ req }) => {
        //  const user = await auth.parseUserAtService(req);
        //  return { user, req };
        //},
      };
    },
  });
