import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { JobRecord, ModelModule, TypegooseModule } from '@nest-libs/model';

import { AppService } from './app.service';
import { JobResolver } from './job.resolver';
import { JobsModule } from './jobs';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ModelModule,
    JobsModule,
    TypegooseModule.forFeature([JobRecord]),
  ],
  providers: [AppService, JobResolver],
})
export class AppModule {}
