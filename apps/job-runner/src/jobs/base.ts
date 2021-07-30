export abstract class BaseJob {
  abstract run(): any;
  abstract timeout: number;

  interval: number;
  cron: string;
  immediate = false;

  totalRuns = -1;
  successfulRuns = -1;
  fatal = false;

  get name() {
    return this.constructor.name;
  }
}

export abstract class CronJob extends BaseJob {
  abstract cron: string;
}

export abstract class IntervalJob extends BaseJob {
  // ms
  abstract interval: number;
}

export abstract class ImmediateJob extends BaseJob {
  abstract totalRuns: number;
  abstract successfulRuns: number;
  readonly immediate = true;
}
