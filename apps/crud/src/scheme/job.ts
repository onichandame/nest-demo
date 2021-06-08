import { createCrudModule } from '@kesci/nest';
import { Job, JobDTOService } from '@kesci/model';

import { JobRecordModule } from './jobRecord';

export const JobModule = createCrudModule({
  EntityClass: Job,
  read: true,
  service: JobDTOService,
  imports: [JobRecordModule],
});
