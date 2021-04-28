import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

@Injectable()
export class RedisService {
  static client?: Redis.Redis | Redis.Cluster

  constructor(private configs: ConfigService) {}

  isCluster(raw = RedisService.client): raw is Redis.Cluster {
    return !!this.configs.get<string>(`REDIS_IS_CLUSTER`) && `nodes` in raw
  }

  get client() {
    if (!RedisService.client) {
      const url = this.configs.get<string>(`REDIS_URL`)
      RedisService.client = this.isCluster()
        ? new Redis.Cluster([url])
        : new Redis(url)
    }
    return RedisService.client
  }

  get nodes() {
    if (this.isCluster(this.client)) return this.client.nodes()
    else return [this.client]
  }
}
