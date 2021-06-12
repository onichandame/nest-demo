import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE } from '@nestjs/graphql';
import { RemoteGraphQLDataSource } from '@apollo/gateway';

class DataSource extends RemoteGraphQLDataSource {
  async willSendRequest({
    request,
    context,
  }: Parameters<NonNullable<RemoteGraphQLDataSource['willSendRequest']>>[0]) {
    const { user } = context;
    if (user) {
      request.http?.headers.set(`x-kesci-user`, JSON.stringify(user));
    }
  }
}

@Module({
  providers: [
    { provide: DataSource, useValue: DataSource },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory:
        (DataSource) =>
        ({ url }: { url: string; name: string }) =>
          new DataSource({ url }),
      inject: [DataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
export class BuildServiceModule {}
