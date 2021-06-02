import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JobRecord, JobRecordSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: JobRecordSchema, name: JobRecord.name },
    ]),
  ],
  exports: [MongooseModule],
})
export class JobRecordModule {}
