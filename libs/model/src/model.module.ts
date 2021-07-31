import { NestjsCommon } from '@nest-libs/deps';

import { ConnectionModule } from './connection';

@NestjsCommon.Module({
  imports: [ConnectionModule.forRoot()],
})
export class ModelModule {}
