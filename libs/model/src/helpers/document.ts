import { Document as MonDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type Document<TDoc> = TDoc & MonDocument<ObjectId>;
