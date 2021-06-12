import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { DynamicModule } from '@nestjs/common';

type Class<T = any> = { new (..._: any[]): T };
const isClass = (raw: any): raw is Class => typeof raw === `function`;

export const createModelModule = (args: {
  EntityClass: Class;
  DTOClass?: Class;
  delete?: boolean;
  update?: boolean | Class;
  create?: boolean | Class;
  read?: boolean;
  imports?: (Class | DynamicModule)[];
  service?: Class;
  primaryKey?: string;
}) => {
  return NestjsQueryGraphQLModule.forFeature({
    imports: [
      NestjsQueryTypegooseModule.forFeature([args.EntityClass]),
      ...(args.imports || []),
    ],
    services: args.service && [args.service],
    resolvers: [
      {
        EntityClass: args.EntityClass,
        DTOClass: args.DTOClass || args.EntityClass,
        create: { disabled: !args.create },
        read: { disabled: !args.read },
        update: { disabled: !args.update },
        delete: { disabled: !args.delete },
        CreateDTOClass: isClass(args.create) ? args.create : undefined,
        UpdateDTOClass: isClass(args.update) ? args.update : undefined,
        Service: args.service,
        referenceBy: { key: args.primaryKey || `_id` },
        enableAggregate: true,
        enableTotalCount: true,
      },
    ],
  });
};
