import { Test, TestingModule } from '@nestjs/testing';
import { MongoConnectionModule } from '@nest-libs/db-connection';
import { getQueryServiceToken, Class } from '@nestjs-query/core';
import {
  TypegooseQueryService,
  NestjsQueryTypegooseModule,
} from '@nestjs-query/query-typegoose';

import { Base } from './base';

export class TestModule {
  public module?: TestingModule;

  static async create(args: {
    entities: Class<Base>[];
    imports?: any[];
    providers?: any[];
  }) {
    const instance = new this();
    instance.module = await Test.createTestingModule({
      imports: [
        MongoConnectionModule.forRoot(),
        NestjsQueryTypegooseModule.forFeature(args.entities),
        ...(args.imports || []),
      ],
      providers: args.providers || [],
    }).compile();
    return instance;
  }

  static close(mod?: TestModule) {
    return mod?.close();
  }

  public getQueryService<T extends Base>(entity: Class<T>) {
    const svc = this.module?.get<TypegooseQueryService<T>>(
      getQueryServiceToken(entity)
    );
    if (svc) return svc;
    else throw new Error(`test module not initated with the given entity!`);
  }

  public close() {
    return this.module?.close();
  }
}
