import { prop } from '@typegoose/typegoose';

import { TestModule } from './base.test-util';
import { Persistent } from './base';

class TestEntity extends Persistent {
  @prop()
  random!: number;
}

describe(__filename, () => {
  let testModule: TestModule;

  beforeAll(async () => {
    testModule = await TestModule.create({ entities: [TestEntity] });
  }, 1000 * 60);

  afterAll(async () => {
    await TestModule.close(testModule);
  });

  it(`can extend classes`, async () => {
    const random = Math.random();
    const svc = testModule.getQueryService(TestEntity);
    let doc = await svc.createOne({ random });
    // check if id is auto-generated
    expect(doc.id).toBeTruthy();
    // check if creation date is auto-generated
    expect(doc.CreatedAt).toBeTruthy();
    doc = await svc.updateOne(doc.id, { random: Math.random() });
    // check if update date is auto-generated
    expect(doc.UpdatedAt).toBeTruthy();
  });
});
