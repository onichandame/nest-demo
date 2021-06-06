import { Module } from '@nestjs/common';
import { MongoConnectionModule } from '@kesci/mongo-connection';
import { createCrudModule } from '@kesci/nest';
import { JobRecord, Job, User } from '@kesci/model';
import { JobRecordDTO, JobDTO, UserDTO, UserUpdateDTO } from '@kesci/dto';

@Module({
  imports: [
    MongoConnectionModule,
    createCrudModule({
      DTOClass: UserDTO,
      EntityClass: User,
      read: true,
      update: UserUpdateDTO,
    }),
    createCrudModule({ EntityClass: Job, DTOClass: JobDTO, read: true }),
    createCrudModule({
      DTOClass: JobRecordDTO,
      EntityClass: JobRecord,
      read: true,
    }),
  ],
})
export class AppModule {}
