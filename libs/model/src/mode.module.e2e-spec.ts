import { Test } from '@nestjs/testing';
import { prop } from '@typegoose/typegoose';
import { INestApplication, Injectable } from '@nestjs/common';

import { Base } from './base';
import { InjectCollection } from './helpers';
import { Collection } from './types';
import { ModelModule } from './model.module';

class TestEntity extends Base {
  @prop()
  random!: number;
}

@Injectable()
class TestRootService {
  constructor(
    @InjectCollection(TestEntity) public col: Collection<TestEntity>
  ) {}
}

describe(__filename, () => {
  let testApp: INestApplication;

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      imports: [ModelModule],
      providers: [TestRootService],
    }).compile();
    testApp = mod.createNestApplication();
  });
  afterAll(async () => testApp?.close());

  it(`can manipulate models in providers`, async () => {
    const svc = testApp.get(TestRootService);
    expect(svc);
    const doc = await svc.col.createOne({ random: Math.random() });
    expect(doc);
  });
});
