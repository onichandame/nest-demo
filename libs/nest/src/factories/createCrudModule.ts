import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';

type Class<T = any> = { new (): T };
const isClass = (raw: any): raw is Class => typeof raw === `function`;

export const createCrudModule = (args: {
  EntityClass: Class;
  DTOClass: Class;
  delete?: boolean;
  update?: boolean | Class;
  create?: boolean | Class;
  read?: boolean;
  primaryKey?: string;
}) => {
  return NestjsQueryGraphQLModule.forFeature({
    imports: [NestjsQueryTypegooseModule.forFeature([args.EntityClass])],
    resolvers: [
      {
        EntityClass: args.EntityClass,
        DTOClass: args.DTOClass,
        create: { disabled: !args.create },
        read: { disabled: !args.read },
        update: { disabled: !args.update },
        delete: { disabled: !args.delete },
        CreateDTOClass: isClass(args.create) ? args.create : undefined,
        UpdateDTOClass: isClass(args.update) ? args.update : undefined,
        referenceBy: { key: args.primaryKey || `_id` },
        enableAggregate: true,
        enableTotalCount: true,
      },
    ],
  });
};
