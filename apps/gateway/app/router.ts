import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  router.get(`/status`, controller.home.status);

  router.get(`/graphql`, (ctx, next) => {
    console.log(ctx.ip);
    next();
  });

  //app.ws.route(`/ws`, controller.ws.greet);
};
