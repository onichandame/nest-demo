import { ObjectType } from '@nestjs/graphql';

import { ExternalBase } from '../base';

@ObjectType(`JobRecord`)
export class ExternalJobRecord extends ExternalBase {}
