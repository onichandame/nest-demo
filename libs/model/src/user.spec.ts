import { TestModule, createRandomStr } from './base.test-util';
import { User } from './user';

describe(__filename, () => {
  let testModule: TestModule;
  beforeAll(async () => {
    testModule = await TestModule.create({ entities: [User] });
  }, 1000 * 60);
  afterAll(() => TestModule.close(testModule));

  it(`can create user with default roles`, async () => {
    const model = testModule.getModel(User);
    const doc = await model.create({ name: createRandomStr() });
    expect(doc.roles.length).toBeGreaterThan(0);
  });
});
