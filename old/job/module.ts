import { createModelModule } from '../helpers';

import { JobRecordModelModule } from '../jobRecord';
import { Job } from './entity';
import { JobDTOService } from './querySvc';

export const JobModelModule = createModelModule({
  EntityClass: Job,
  read: true,
  service: JobDTOService,
  imports: [JobRecordModelModule],
});
