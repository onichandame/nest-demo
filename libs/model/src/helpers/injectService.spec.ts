import { Injectable } from '@nestjs/common';
import { prop } from '@typegoose/typegoose';

import { Collection } from '../types';
import { Base } from '../base';
import { TestModule } from '../base.test-util';
import { InjectCollection } from './injectCollection';

class TestEntity extends Base {
  @prop()
  random!: number;
}

@Injectable()
class TestService {
  constructor(
    @InjectCollection(TestEntity) public col: Collection<TestEntity>
  ) {}
}

describe(__filename, () => {
  let testMod: TestModule;
  beforeAll(async () => {
    testMod = await TestModule.create({
      entities: [TestEntity],
      providers: [TestService],
    });
  }, 1000 * 60);
  afterAll(() => TestModule.close(testMod));

  it(`can use injected collection`, async () => {
    const svc = testMod.module?.get(TestService);
    expect(svc).toBeTruthy();
    const doc = await svc?.col.createOne({ random: Math.random() });
    expect(doc).toBeTruthy();
  });
});
