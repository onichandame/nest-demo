import { createCrudModule } from '@kesci/nest';
import { JobRecord } from '@kesci/model';

export const JobRecordModule = createCrudModule({
  EntityClass: JobRecord,
  read: true,
});
