import { Logger, Module, DynamicModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ClientProxyFactory,
  Transport,
  MicroserviceOptions,
} from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'

import { ClientToken } from './constants'

// supplementary modules
import { DbModule } from './db'

// services
import { GatewayModule } from './gateway'
import { UserModule } from './user'

const DefaultNatsUrl = `nats://localhost:4222`

@Module({})
class BaseModule {
  static forRoot(module: any): DynamicModule {
    return {
      imports: [DbModule, ConfigModule.forRoot(), module],
      providers: [
        {
          provide: ClientToken,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            ClientProxyFactory.create({
              transport: Transport.NATS,
              options: {
                url: configService.get<string>(`NATS_URL`) || DefaultNatsUrl,
              },
            }),
        },
      ],
      module: BaseModule,
    }
  }
}

const createGateway = async (module: any) =>
  NestFactory.create(BaseModule.forRoot(module))

const createMicroservice = async (module: any) => {
  const context = await NestFactory.createApplicationContext(
    BaseModule.forRoot(module)
  )
  const configService = context.get<ConfigService>(ConfigService)
  const app = NestFactory.createMicroservice<MicroserviceOptions>(
    BaseModule.forRoot(module),
    {
      transport: Transport.NATS,
      options: { url: configService.get<string>(`NATS_URL`) || DefaultNatsUrl },
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
  const config = app.get(ConfigService)
  await app.listenAsync(config.get(`PORT`) || 3000)
  logger.log(`${appName} ready`)
}

bootstrap()
