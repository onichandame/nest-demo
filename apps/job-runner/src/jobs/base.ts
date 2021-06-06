import { parseExpression } from 'cron-parser';
import { JobType } from '@kesci/constants';
import { JobRecord } from '@kesci/model';

export abstract class BaseJob {
  abstract run(): any;

  limit = -1;

  get name() {
    return this.constructor.name;
  }

  isOverLimit(count: number) {
    return this.limit < 0 || count >= this.limit;
  }
}

export abstract class BaseCronJob extends BaseJob {
  abstract cron: string;

  get interval() {
    return parseExpression(this.cron);
  }

  hasBeenRun(date: Date, lastRecord: JobRecord) {
    return date.getTime() < lastRecord.CreatedAt.getTime();
  }
}

export abstract class BaseIntervalJob extends BaseJob {
  // ms
  abstract interval: number;
}

export abstract class BaseNceJob extends BaseIntervalJob {
  abstract limit: number;
}
