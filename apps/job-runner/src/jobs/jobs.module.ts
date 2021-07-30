import { Module } from '@nestjs/common';
import {
  User,
  Credential,
  ModelModule,
  TypegooseModule,
} from '@nest-libs/model';

// import jobs here
import { InitAdmin } from './initAdmin';

export const JobsToken = Symbol(`jobs`);

const Jobs = [InitAdmin];

@Module({
  imports: [ModelModule, TypegooseModule.forFeature([User, Credential])],
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
