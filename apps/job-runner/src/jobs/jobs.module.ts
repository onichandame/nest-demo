import { NestjsCommon, NestjsTypegoose } from '@nest-libs/deps';
import { User, Credential, ModelModule } from '@nest-libs/model';

// import jobs here
import { InitAdmin } from './initAdmin';

export const JobsToken = Symbol(`jobs`);

const Jobs = [InitAdmin];

@NestjsCommon.Module({
  imports: [
    ModelModule,
    NestjsTypegoose.TypegooseModule.forFeature([User, Credential]),
  ],
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
