import { Module } from '@nestjs/common';
import { ModelModule } from '@kesci/model';

import { AppService } from './app.service';
import { JobResolver } from './job.resolver';
import { JobsModule } from './jobs';

@Module({
  imports: [ModelModule, JobsModule],
  providers: [AppService, JobResolver],
})
export class AppModule {}
