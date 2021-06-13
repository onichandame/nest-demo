import { Test, TestingModule } from '@nestjs/testing';
import { Injectable } from '@nestjs/common';
import { MongoConnectionModule } from '@nest-libs/db-connection';
import { TypeOrmModule, InjectEntityManager } from '@nestjs/typeorm';
import {
  DeepPartial,
  Entity,
  Column,
  EntityManager,
  FindManyOptions,
} from 'typeorm';

import { Base } from './base';

type Class<T> = {
  new (): T;
};

@Injectable()
class QueryService {
  constructor(@InjectEntityManager() private db: EntityManager) {}

  create<T>(entity: Class<T>, doc: DeepPartial<T>) {
    return this.db.insert(entity, doc);
  }

  find<T>(entity: Class<T>, filter: FindManyOptions<T>) {
    return this.db.find(entity, filter);
  }
}

@Entity()
class Common extends Base {
  @Column()
  random!: number;
}

describe(__filename, () => {
  let mod: TestingModule;
  let svc: QueryService;
  beforeAll(async () => {
    console.log(`starting`);
    mod = await Test.createTestingModule({
      imports: [MongoConnectionModule, TypeOrmModule.forFeature([Common])],
      providers: [QueryService],
    }).compile();
    svc = mod.get(QueryService);
  }, 1000 * 3);
  afterAll(async () => {
    await mod.close();
  }, 1000 * 3);

  it(
    `can extend Base`,
    async () => {
      const random = Math.random();
      await svc.create(Common, { random });
      const docs = await svc.find(Common, { where: { random } });
      expect(docs.length > 0);
    },
    1000 * 3
  );
});
