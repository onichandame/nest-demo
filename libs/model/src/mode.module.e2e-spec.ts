import { Test } from '@nestjs/testing';
import { prop } from '@typegoose/typegoose';
import { INestApplication, Injectable, Module } from '@nestjs/common';

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

@Injectable()
class TestSecondaryService {
  constructor(
    @InjectCollection(TestEntity) public col: Collection<TestEntity>
  ) {}
}

@Module({ providers: [TestSecondaryService] })
class TestModule {}

describe(__filename, () => {
  let testApp: INestApplication;

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      imports: [ModelModule, TestModule],
      providers: [TestRootService],
    }).compile();
    testApp = mod.createNestApplication();
  }, 1000 * 60);
  afterAll(async () => testApp?.close());

  it(`can manipulate models in providers`, async () => {
    const svc = testApp.get(TestRootService);
    expect(svc);
    const doc = await svc.col.createOne({ random: Math.random() });
    expect(doc);
  });

  it(`can manipulate models in children modules`, async () => {
    const svc = testApp.get(TestSecondaryService);
    expect(svc);
    const doc = await svc.col.createOne({ random: Math.random() });
    expect(doc);
  });
});
