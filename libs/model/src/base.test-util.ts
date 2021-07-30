import { Test, TestingModule } from '@nestjs/testing';
import { MongoConnectionModule } from '@nest-libs/db-connection';
import { TypegooseModule, getModelToken } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';

import { Base } from './base';

export class TestModule {
  public module?: TestingModule;

  static async create(args: {
    entities: any[];
    imports?: any[];
    providers?: any[];
  }) {
    const instance = new this();
    instance.module = await Test.createTestingModule({
      imports: [
        MongoConnectionModule.forRoot(),
        TypegooseModule.forFeature(args.entities),
        ...(args.imports || []),
      ],
      providers: args.providers || [],
    }).compile();
    return instance;
  }

  static close(mod?: TestModule) {
    return mod?.close();
  }

  public getModel<T extends Base>(entity: { new (..._: any[]): T }) {
    const svc = this.module?.get<ReturnModelType<AnyParamConstructor<T>>>(
      getModelToken(entity.name)
    );
    if (svc) return svc;
    else throw new Error(`test module not initated with the given entity!`);
  }

  public close() {
    return this.module?.close();
  }
}

export const createRandomStr = () => Math.random().toString(36).substr(4, 5);
