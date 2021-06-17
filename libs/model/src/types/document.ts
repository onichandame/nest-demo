import { DocumentType } from '@typegoose/typegoose';

import { Base } from '../base';

export type Document<T extends Base> = DocumentType<T>;
