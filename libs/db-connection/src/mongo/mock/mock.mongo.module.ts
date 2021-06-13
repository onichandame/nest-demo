import { Module } from '@nestjs/common';

import { MockMongoService } from './mock.mongo.service';

@Module({ providers: [MockMongoService], exports: [MockMongoService] })
export class MockMongoModule {}
