import { Module, DynamicModule } from '@nestjs/common';

import { MockMongoService } from './mock.mongo.service';

@Module({})
export class MockMongoModule {
  static forRoot() {}
}
