import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common'
import { v4 as getRandomStr } from 'uuid'
import { Cache } from 'cache-manager'

@Injectable()
export class SessionService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async revokeSession(key: string) {
    return this.cache.del(key)
  }

  async createSession(id: string) {
    const key = getRandomStr()
    await this.cache.set(key, id)
    return key
  }

  async getSession(key: string) {
    return this.cache.get<string>(key)
  }
}
