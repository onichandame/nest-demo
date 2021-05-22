import { Persistent, Timestamp } from '../common';

export type StripAutoFields<T> = Omit<T, keyof Persistent | keyof Timestamp>;
