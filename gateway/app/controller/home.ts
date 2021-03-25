import { Controller } from "egg";

export default class UserController extends Controller {
  async status() {
    this.ctx.status = 200;
  }
}
