import { DocumentType, defaultClasses } from '@typegoose/typegoose';

export type StripDocumentProperties<T = any> = Omit<
  T,
  keyof DocumentType<defaultClasses.Base>
>;
