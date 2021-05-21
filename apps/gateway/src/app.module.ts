import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { MongoConnectionModule } from '@kesci/mongo-connection';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      imports: [MongoConnectionModule],
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
})
export class AppModule {}
