export * from './model.module';

// models and dtos and services
export * from './models';

// abstract entities
export * from './base';

export {
  pre,
  Ref,
  post,
  prop,
  index,
  ReturnModelType,
  isDocument,
  isDocumentArray,
  isRefType,
  getModelForClass,
  DocumentType,
  types,
} from '@typegoose/typegoose';
export { getModelToken, InjectModel, TypegooseModule } from 'nestjs-typegoose';
