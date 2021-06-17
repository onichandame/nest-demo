import { JobStatus, JobType } from '@nest-libs/constants';

import { Document } from './types';
import { TestModule, createRandomStr } from './base.test-util';
import { Job, JobRecord } from './job';

describe(__filename, () => {
  let testMod: TestModule;
  let job: Document<Job>;
  beforeAll(async () => {
    testMod = await TestModule.create({ entities: [JobRecord, Job] });
    const svc = testMod.getQueryService(Job);
    job = await svc.createOne({ name: createRandomStr(), type: JobType.CRON });
  }, 1000 * 60);
  afterAll(() => TestModule.close(testMod));

  it(`can create records with default status`, async () => {
    const svc = testMod.getQueryService(JobRecord);
    const doc = await svc.createOne({ job });
    expect(doc.status).toBe(JobStatus.PENDING);
  });
});
