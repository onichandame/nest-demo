import { Injectable, Module, INestApplication } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { Repository, Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

import { MongoConnectionModule } from './mongo.module';

@Entity()
class TestEntity {
  @ObjectIdColumn()
  id!: ObjectID;
  @Column()
  random!: number;
}

@Injectable()
class TestService {
  constructor(
    @InjectRepository(TestEntity) private col: Repository<TestEntity>
  ) {}

  async create(args: Omit<TestEntity, 'id'>) {
    const doc = this.col.create(args);
    return this.col.save(doc);
  }

  async find(filter: Partial<TestEntity>) {
    return this.col.find(filter);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
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
        imports: [
          MongoConnectionModule.forRoot({ entities: [TestEntity] }),
          TestModule,
        ],
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
