import { Logger, Module, DynamicModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'

// supplementary modules
import { DbModule } from './db'
import { Model } from './model'

// services
import { GatewayModule } from './gateway'
import { AuthModule } from './auth'

@Module({})
class BaseModule {
  static forRoot(module: any): DynamicModule {
    return {
      imports: [DbModule, ConfigModule.forRoot(), Model, module],
      module: BaseModule,
    }
  }
}

const createGateway = async (module: any) =>
  NestFactory.create(BaseModule.forRoot(module))

const createMicroservice = async (module: any) =>
  NestFactory.createMicroservice<MicroserviceOptions>(
    BaseModule.forRoot(module),
    {
      transport: Transport.NATS,
      options: { queue: `auth`, name: `auth`, url: `nats://localhost:4222` },
    }
  )

const bootstrap = async () => {
  const appName = process.env.APP || `unknowApp`
  const logger = new Logger(appName)
  const getApp = () => {
    switch (appName) {
      case `gateway`:
        return createGateway(GatewayModule)
      case `auth`:
        return createMicroservice(AuthModule)
      default:
        throw new Error(`${appName} not valid app!`)
    }
  }
  const app = await getApp()
  const config = app.get(ConfigService)
  await app.listenAsync(config.get(`PORT`) || 3000)
  logger.log(`${appName} ready`)
}

bootstrap()
