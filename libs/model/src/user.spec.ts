import { TestModule, createRandomStr } from './base.test-util';
import { User } from './user';

describe(__filename, () => {
  let testModule: TestModule;
  beforeAll(async () => {
    testModule = await TestModule.create({ entities: [User] });
  });
  afterAll(() => TestModule.close(testModule));

  it(`can create user with default roles`, async () => {
    const svc = testModule.getQueryService(User);
    const doc = await svc.createOne({ name: createRandomStr() });
    expect(doc?.roles?.length).toBeTruthy();
  });
});
