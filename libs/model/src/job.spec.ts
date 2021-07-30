import { JobStatus } from '@nest-libs/constants';

import { TestModule, createRandomStr } from './base.test-util';
import { JobRecord } from './job';

describe(__filename, () => {
  let testMod: TestModule;
  const job = createRandomStr();

  beforeAll(async () => {
    testMod = await TestModule.create({ entities: [JobRecord] });
  }, 1000 * 60);

  afterAll(() => TestModule.close(testMod));

  it(`can create records with default status`, async () => {
    const model = testMod.getModel(JobRecord);
    const doc = await model.create({ job });
    // default status is pending
    expect(doc.status).toBe(JobStatus.PENDING);
    // cannot create two jobs with the same prev
    expect(model.create({ job })).rejects.toBeTruthy();
  });
});
