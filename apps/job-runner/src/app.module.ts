import { Module } from '@nestjs/common';
import { ModelModule } from '@kesci/model';

import { AppService } from './app.service';

@Module({
  imports: [ModelModule],
  providers: [AppService],
})
export class AppModule {}
