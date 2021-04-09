import { Logger } from '@nestjs/common'

import { AuthModule } from './auth.module'
import { createMicroservice } from '../common'

const logger = new Logger(`Auth`)

async function bootstrap() {
  const app = await createMicroservice(AuthModule)
  await app.listenAsync()
  logger.log(`auth ready`)
}

export default bootstrap
