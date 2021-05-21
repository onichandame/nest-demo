import { Document } from 'mongoose';

export type StripDocumentProperties<T extends Document> = Omit<
  T,
  keyof Document
>;
