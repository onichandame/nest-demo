import { Module } from '@nestjs/common';
import { ModelModule } from '@kesci/model';

import { JobsToken } from '../constants';
import { InitAdmin } from './initAdmin';

export const Jobs = [InitAdmin];

@Module({
  imports: [ModelModule],
  exports: [JobsToken],
  providers: [
    ...Jobs,
    {
      provide: JobsToken,
      useFactory: (...jobs) => {
        return jobs;
      },
      inject: Jobs,
    },
  ],
})
export class JobsModule {}
