import { Application } from "egg";
import * as GraphQL from "koa-graphql";

import { schema } from "./graphql/resolver";

export default (app: Application) => {
  const { controller, router } = app;

  router.all(`/graphql`, GraphQL({ schema }));

  router.get("/status", controller.home.status);
};
