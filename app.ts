import { Application } from "egg";
import "reflect-metadata";

export default (app: Application) => {
  app.beforeStart(async () => {});
};
