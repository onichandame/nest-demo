import { Persistent } from '../persistent';
import { StripDocumentProperties } from './stripDocumentProperties';

export type StripAutoFields<T = any> = Omit<
  StripDocumentProperties<T>,
  keyof Persistent
>;
