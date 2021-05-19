import { Timestamp } from '../entities';

export type StripAutoFields<T> = Omit<T, keyof Timestamp>;
