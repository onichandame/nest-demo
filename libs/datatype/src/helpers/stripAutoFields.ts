import { Document } from 'mongoose';

import { Timestamp } from '../entities';

export type StripAutoFields<T> = Omit<T, keyof Timestamp>;

export type StripDocumentProperties<T extends Document> = Omit<
  T,
  keyof Omit<Document, '_id'>
>;
