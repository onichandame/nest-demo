import { Application } from "egg";
import { ApolloServer } from "apollo-server-koa";
import "reflect-metadata";

import { schema } from "./app/resolver";

export default (app: Application) => {
  const path = `/api/org/graphql`;
  app.on(`server`, (server) => {
    const apolloServer = new ApolloServer({
      schema,
      playground: true,
      subscriptions: { path },
      introspection: true,
    });
    apolloServer.applyMiddleware({ app, path });
    apolloServer.installSubscriptionHandlers(server);
  });
};
