import {
  NestjsCommon,
  NestjsQueryQueryGraphql,
  NestjsQueryQueryTypegoose,
} from '@nest-libs/deps';
import { Credential, ModelModule } from '@nest-libs/model';

import { CredentialDTO } from './credential.dto';

@NestjsCommon.Module({
  imports: [
    NestjsQueryQueryGraphql.NestjsQueryGraphQLModule.forFeature({
      imports: [
        ModelModule,
        NestjsQueryQueryTypegoose.NestjsQueryTypegooseModule.forFeature([
          Credential,
        ]),
      ],
      resolvers: [
        {
          EntityClass: Credential,
          DTOClass: CredentialDTO,
          delete: { disabled: true },
          referenceBy: { key: `id` },
        },
      ],
    }),
  ],
})
export class CredentialModule {}
