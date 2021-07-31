import {
  Typegoose,
  NestjsTesting,
  NestjsCommon,
  NestjsTypegoose,
  mongoose,
} from '@nest-libs/deps';

import { ConnectionModule } from './connection.module';

class TestEntity implements Typegoose.defaultClasses.Base {
  _id!: mongoose.Types.ObjectId;
  id!: string;
  @Typegoose.prop()
  random!: number;
}

@NestjsCommon.Injectable()
class TestService {
  constructor(
    @NestjsTypegoose.InjectModel(TestEntity)
    private col: Typegoose.ReturnModelType<typeof TestEntity>
  ) {}

  async create(args: Omit<TestEntity, keyof Typegoose.defaultClasses.Base>) {
    return this.col.create(args);
  }

  async find(filter: Partial<TestEntity>) {
    return this.col.find(filter);
  }
}

@NestjsCommon.Module({
  imports: [NestjsTypegoose.TypegooseModule.forFeature([TestEntity])],
  providers: [TestService],
  exports: [TestService],
})
class TestModule {}

describe(ConnectionModule.name, () => {
  let app: NestjsCommon.INestApplication;

  test(
    `can create connection to database in unittest environment`,
    async () => {
      const moduleRef = await NestjsTesting.Test.createTestingModule({
        imports: [ConnectionModule.forRoot(), TestModule],
      }).compile();
      app = moduleRef.createNestApplication();
      await app.init();
      expect(app).toBeTruthy();
      const testSvc = app.get(TestService);
      expect(testSvc).toBeTruthy();
      const random = Math.random();
      await testSvc.create({ random });
      const docs = await testSvc.find({ random });
      expect(docs.length > 0);
      await app.close();
    },
    1000 * 60
  );
});
