import { Test, TestingModule } from '@nestjs/testing';
import { Module, Injectable } from '@nestjs/common';
import { MongoConnectionModule } from '@nest-libs/db-connection';
import { TypeOrmModule, InjectEntityManager } from '@nestjs/typeorm';
import {
  DeepPartial,
  Entity,
  Column,
  EntityManager,
  FindManyOptions,
} from 'typeorm';

import { Base, Timestamp, Persistent } from './base';

type Class<T> = {
  new (): T;
};

@Injectable()
class QueryService {
  constructor(@InjectEntityManager() private db: EntityManager) {}

  create<T>(entity: Class<T>, doc: DeepPartial<T>) {
    const docs = this.db.create(entity, doc);
    return this.db.save(docs);
  }

  find<T>(entity: Class<T>, filter: FindManyOptions<T>) {
    return this.db.find(entity, filter);
  }

  softDelete<T>(entity: Class<T>, filter: Partial<T>) {
    return this.db.softDelete(entity, filter);
  }
}

@Entity()
class TestBaseEntity extends Base {
  @Column()
  random!: number;
}

@Entity()
class TestTimestampEntity extends Timestamp {
  @Column()
  random!: number;
}

@Entity()
class TestPersistentEntity extends Persistent {
  @Column()
  random!: number;
}

@Module({
  imports: [TypeOrmModule.forFeature([TestBaseEntity])],
  exports: [TypeOrmModule],
})
class TestModule {}

describe(__filename, () => {
  let mod: TestingModule;
  let svc: QueryService;

  beforeAll(async () => {
    mod = await Test.createTestingModule({
      imports: [
        MongoConnectionModule.forRoot({
          entities: [TestBaseEntity, TestTimestampEntity, TestPersistentEntity],
        }),
        TestModule,
      ],
      providers: [QueryService],
    }).compile();
    mod.enableShutdownHooks();
    svc = mod.get(QueryService);
    expect(svc).toBeTruthy();
  });

  afterAll(async () => {
    await mod.close();
  });

  it(`can extend Base`, async () => {
    const random = Math.random();
    await svc.create(TestBaseEntity, { random });
    const docs = await svc.find(TestBaseEntity, { where: { random } });
    expect(docs.length > 0);
    expect(docs[0]._id).toBeTruthy();
  });

  it(`can extend timestamp`, async () => {
    const random = Math.random();
    await svc.create(TestTimestampEntity, { random });
    const docs = await svc.find(TestTimestampEntity, { where: { random } });
    expect(docs.length > 0);
    expect(docs[0].CreatedAt).toBeTruthy();
    expect(docs[0].UpdatedAt).toBeTruthy();
  });

  it(`can extend persistent`, async () => {
    const random = Math.random();
    await svc.create(TestPersistentEntity, { random });
    let docs = await svc.find(TestPersistentEntity, { where: { random } });
    expect(docs.length > 0);
    expect(docs[0].DeletedAt).toBeFalsy();
    await svc.softDelete(TestPersistentEntity, { random });
    docs = await svc.find(TestPersistentEntity, { where: { random } });
    expect(docs.length > 0);
    expect(docs[0].DeletedAt).toBeTruthy();
  });
});
