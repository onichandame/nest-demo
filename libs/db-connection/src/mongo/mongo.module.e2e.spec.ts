import { Injectable, Module, INestApplication } from '@nestjs/common';
import { InjectModel, TypegooseModule } from 'nestjs-typegoose';
import { Test } from '@nestjs/testing';
import { ReturnModelType, prop, defaultClasses } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { MongoConnectionModule } from './mongo.module';

class TestEntity implements defaultClasses.Base {
  _id!: Types.ObjectId;
  id!: string;
  @prop()
  random!: number;
}

@Injectable()
class TestService {
  constructor(
    @InjectModel(TestEntity) private col: ReturnModelType<typeof TestEntity>
  ) {}

  async create(args: Omit<TestEntity, keyof defaultClasses.Base>) {
    return this.col.create(args);
  }

  async find(filter: Partial<TestEntity>) {
    return this.col.find(filter);
  }
}

@Module({
  imports: [TypegooseModule.forFeature([TestEntity])],
  providers: [TestService],
  exports: [TestService],
})
class TestModule {}

describe(MongoConnectionModule.name, () => {
  let app: INestApplication;

  test(
    `can create connection to database in unittest environment`,
    async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [MongoConnectionModule.forRoot(), TestModule],
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
