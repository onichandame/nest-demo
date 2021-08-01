import { NestjsCommon } from '@nest-libs/deps';

import { UserModule } from './user';
import { CredentialModule } from './credential';

@NestjsCommon.Module({ imports: [UserModule, CredentialModule] })
export class AppModule {}
