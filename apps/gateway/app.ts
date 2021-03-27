import { Application } from "egg";
import { ApolloServer } from "apollo-server-koa";
import "reflect-metadata";

import { schema } from "./app/resolver";

export default (app: Application) => {
  app.on(`server`, (server) => {
    const apolloServer = new ApolloServer({
      schema,
      playground: true,
      subscriptions: { path: `/graphql` },
    });
    apolloServer.applyMiddleware({ app });
    apolloServer.installSubscriptionHandlers(server);
  });
};
