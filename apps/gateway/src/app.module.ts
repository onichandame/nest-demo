import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => {
        return {
          server: { path: `/graphql` },
          gateway: {
            serviceList: [
              { name: `user`, url: `http://localhost:3001/graphql` },
            ],
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
