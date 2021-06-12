import { DynamicModule } from '@nestjs/common';

type Class<T = any> = { new (..._: any[]): T };
const isClass = (raw: any): raw is Class => typeof raw === `function`;

export const createCrudResolver = (args: {
  EntityClass: Class;
  DTOClass: Class;
  delete?: boolean;
  update?: boolean | Class;
  create?: boolean | Class;
  read?: boolean;
  imports?: (Class | DynamicModule)[];
  service?: Class;
  primaryKey?: string;
}) => {
  return {
    EntityClass: args.EntityClass,
    DTOClass: args.DTOClass,
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
  };
};
