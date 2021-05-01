import { Global, Logger, Module, DynamicModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'

import { RedisModule } from './redis'
import { LockModule } from './lock'
import { DbModule } from './db'
import configuration from './config'

// apps
import { GatewayModule } from './gateway'
import { JobModule } from './job'
import { UserModule } from './user'
import { AuthenticateModule } from './authenticate'

const microserviceMap = {
  job: JobModule,
  user: UserModule,
  authenticate: AuthenticateModule,
}

@Global()
@Module({})
class BaseModule {
  static forRoot(module?: any): DynamicModule {
    const modules = [
      RedisModule,
      LockModule,
      DbModule,
      ConfigModule.forRoot({ load: [configuration] }),
    ]
    if (module) modules.push(module)
    return {
      imports: modules,
      module: BaseModule,
    }
  }
}

const getConfigService = async () => {
  const context = await NestFactory.createApplicationContext(
    BaseModule.forRoot()
  )
  const service = context.get<ConfigService>(ConfigService)
  await context.close() // has to close or mongo connection 'default' will conflict
  return service
}

const createGateway = async (module: any) => {
  const app = await NestFactory.create(BaseModule.forRoot(module))
  return app
}

const createMicroservice = async (module: any) => {
  const configService = await getConfigService()
  const msgProviderUrl = configService.get<string>(`REDIS_URL`)
  const app = NestFactory.createMicroservice<MicroserviceOptions>(
    BaseModule.forRoot(module),
    {
      transport: Transport.REDIS,
      options: { url: msgProviderUrl, retryAttempts: 1 },
    }
  )
  return app
}

const bootstrap = async () => {
  const appName = process.env.APP || `unknowApp`
  const logger = new Logger(appName)
  const getApp = () => {
    if (appName === `gateway`) return createGateway(GatewayModule)
    else if (appName in microserviceMap)
      return createMicroservice(microserviceMap[appName])
    else throw new Error(`${appName} not valid app!`)
  }
  const app = await getApp()
  const configs = await getConfigService()
  const port = configs.get<string>(`PORT`) || 3000
  await app.listenAsync(port)
  logger.log(`${appName} ready`)
}

bootstrap()
