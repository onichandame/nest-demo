import { Timestamp } from '../common';

export type StripAutoFields<T> = Omit<T, keyof Timestamp>;
