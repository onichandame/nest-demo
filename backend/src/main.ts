import { Logger, Module, DynamicModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'

// supplementary modules
import { DbModule } from './db'

// services
import { GatewayModule } from './gateway'
import { UserModule } from './user'

const DefaultNatsUrl = `nats://localhost:4222`

@Module({})
class BaseModule {
  static forRoot(module?: any): DynamicModule {
    const modules = [DbModule, ConfigModule.forRoot()]
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

const createGateway = async (module: any) =>
  NestFactory.create(BaseModule.forRoot(module))

const createMicroservice = async (module: any) => {
  const configService = await getConfigService()
  const natsUrl = configService.get<string>(`NATS_URL`) || DefaultNatsUrl
  const app = NestFactory.createMicroservice<MicroserviceOptions>(
    BaseModule.forRoot(module),
    {
      transport: Transport.NATS,
      options: { url: natsUrl },
    }
  )
  return app
}

const bootstrap = async () => {
  const appName = process.env.APP || `unknowApp`
  const logger = new Logger(appName)
  const getApp = () => {
    switch (appName) {
      case `gateway`:
        return createGateway(GatewayModule)
      case `user`:
        return createMicroservice(UserModule)
      default:
        throw new Error(`${appName} not valid app!`)
    }
  }
  const app = await getApp()
  const configs = await getConfigService()
  const port = configs.get<string>(`PORT`) || 3000
  await app.listenAsync(port)
  logger.log(`${appName} ready`)
}

bootstrap()
