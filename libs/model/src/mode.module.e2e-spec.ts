import {
  NestjsCommon,
  NestjsTypegoose,
  Typegoose,
  NestjsTesting,
} from '@nest-libs/deps';

import { Base } from './base';
import { ModelModule } from './model.module';

class TestEntity extends Base {
  @Typegoose.prop()
  random!: number;
}

@NestjsCommon.Injectable()
class TestRootService {
  constructor(
    @NestjsTypegoose.InjectModel(TestEntity)
    public col: Typegoose.ReturnModelType<typeof TestEntity>
  ) {}
}

@NestjsCommon.Injectable()
class TestSecondaryService {
  constructor(
    @NestjsTypegoose.InjectModel(TestEntity)
    public col: Typegoose.ReturnModelType<typeof TestEntity>
  ) {}
}

@NestjsCommon.Module({ providers: [TestSecondaryService] })
class TestModule {}

describe(__filename, () => {
  let testApp: NestjsCommon.INestApplication;

  beforeAll(async () => {
    const mod = await NestjsTesting.Test.createTestingModule({
      imports: [ModelModule, TestModule],
      providers: [TestRootService],
    }).compile();
    testApp = mod.createNestApplication();
  }, 1000 * 60);
  afterAll(async () => testApp?.close());

  it(`can manipulate models in providers`, async () => {
    const svc = testApp.get(TestRootService);
    expect(svc);
    const doc = await svc.col.create({ random: Math.random() });
    expect(doc);
  });

  it(`can manipulate models in children modules`, async () => {
    const svc = testApp.get(TestSecondaryService);
    expect(svc);
    const doc = await svc.col.create({ random: Math.random() });
    expect(doc);
  });
});
