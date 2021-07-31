import { Typegoose, NestjsTesting, NestjsTypegoose } from '@nest-libs/deps';

import { ConnectionModule } from './connection';
import { Base } from './base';

export class TestModule {
  public module?: NestjsTesting.TestingModule;

  static async create(args: {
    entities: any[];
    imports?: any[];
    providers?: any[];
  }) {
    const instance = new this();
    instance.module = await NestjsTesting.Test.createTestingModule({
      imports: [
        ConnectionModule.forRoot(),
        NestjsTypegoose.TypegooseModule.forFeature(args.entities),
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
    const svc = this.module?.get<
      Typegoose.ReturnModelType<Typegoose.types.AnyParamConstructor<T>>
    >(NestjsTypegoose.getModelToken(entity.name));
    if (svc) return svc;
    else throw new Error(`test module not initated with the given entity!`);
  }

  public close() {
    return this.module?.close();
  }
}

export const createRandomStr = () => Math.random().toString(36).substr(4, 5);
