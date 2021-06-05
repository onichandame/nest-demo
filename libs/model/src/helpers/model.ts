import { ReturnModelType } from '@typegoose/typegoose';

export type Model<T> = ReturnModelType<{ new (): T }>;
