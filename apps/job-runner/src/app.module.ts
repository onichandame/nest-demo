import { NestjsCommon, NestjsTypegoose, NestjsSchedule } from '@nest-libs/deps';
import { JobRecord, ModelModule } from '@nest-libs/model';

import { AppService } from './app.service';
import { JobResolver } from './job.resolver';
import { JobsModule } from './jobs';

@NestjsCommon.Module({
  imports: [
    NestjsSchedule.ScheduleModule.forRoot(),
    ModelModule,
    JobsModule,
    NestjsTypegoose.TypegooseModule.forFeature([JobRecord]),
  ],
  providers: [AppService, JobResolver],
})
export class AppModule {}
