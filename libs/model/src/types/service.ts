import { TypegooseQueryService } from '@nestjs-query/query-typegoose';

import { Base } from '../base';

export type Service<T extends Base> = TypegooseQueryService<T>;
