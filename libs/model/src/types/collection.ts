import { TypegooseQueryService } from '@nestjs-query/query-typegoose';

import { Base } from '../base';

export type Collection<T extends Base> = TypegooseQueryService<T>;
