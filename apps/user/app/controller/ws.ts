import { Controller } from "egg";

export default class WsController extends Controller {
  async greet() {
    this.ctx.websocket?.on(`message`, (msg) => {
      console.log(msg.toString());
      this.ctx.websocket?.send(`hello`);
    });
  }
}
