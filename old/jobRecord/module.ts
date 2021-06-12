import { createModelModule } from '../helpers';

import { JobRecord } from './entity';

export const JobRecordModelModule = createModelModule({
  EntityClass: JobRecord,
  read: true,
});
