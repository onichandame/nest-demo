import { BaseNceJob } from './base';

export class InitAdmin extends BaseNceJob {
  limit = 1;
  async run() {
    console.log(`hi`);
  }
}
