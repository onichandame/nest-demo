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
    const model = testModule.getModel(TestEntity);
    let doc = await model.create({ random });
    // check if id is auto-generated
    expect(doc.id).toBeTruthy();
    // check if creation date is auto-generated
    expect(doc.createdAt).toBeTruthy();
    doc = await model
      .findByIdAndUpdate(doc.id, { random: Math.random() }, { new: true })
      .orFail(new Error(`doc not found`))
      .exec();
    // check if update date is auto-generated
    expect(doc.updatedAt).toBeTruthy();
  });
});
