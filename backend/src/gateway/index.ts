import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { GatewayModule } from './gateway.module'
import { createGateway } from '../common'

const logger = new Logger(`Gateway`)

const bootstrap = async () => {
  const app = await createGateway(GatewayModule)
  const config = app.get(ConfigService)
  await app.listen(config.get(`PORT`) || `3002`, () =>
    logger.log(`gateway ready`)
  )
}

export default bootstrap
