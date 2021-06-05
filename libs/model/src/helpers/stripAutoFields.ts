import { Persistent } from '../common';
import { StripDocumentProperties } from './stripDocumentProperties';

export type StripAutoFields<T = any> = Omit<
  StripDocumentProperties<T>,
  keyof Persistent
>;
