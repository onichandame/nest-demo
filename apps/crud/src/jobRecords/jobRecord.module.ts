import { Module } from '@nestjs/common';
import { createCrudModule } from '@kesci/nest';
import { JobRecord } from '@kesci/model';

import { JobRecordDTO } from './dto';

@Module({
  imports: [
    createCrudModule({
      DTOClass: JobRecordDTO,
      EntityClass: JobRecord,
      read: true,
    }),
  ],
})
export class JobRecordModule {}
