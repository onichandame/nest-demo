import { Injectable } from '@nestjs/common'
import * as Redlock from 'redlock'

import { RedisService } from '../redis'
import { LOCK_TTL } from '../constants'

@Injectable()
export class LockService {
  constructor(private redisSvc: RedisService) {}
  private static _redlock: Redlock
  private get redlock() {
    if (!LockService._redlock)
      LockService._redlock = new Redlock([this.redisSvc.client])
    return LockService._redlock
  }

  async lock(key: string) {
    return new Lock(key, this.redlock)
  }
}

class Lock {
  private daemon?: ReturnType<typeof setInterval>
  private locked = false
  private lock?: Redlock.Lock
  constructor(private _key: string, private redlock: Redlock) {}

  private get key() {
    return `lock:${this._key}`
  }

  private async extend() {
    if (this.locked) return this.lock?.extend(1000 * LOCK_TTL)
  }

  async acquire() {
    if (this.locked) throw new Error(`already locked!`)
    this.locked = true
    this.lock = await this.redlock.lock(this.key, 1000 * LOCK_TTL)
    clearInterval(this.daemon)
    this.daemon = setInterval(() => this.extend(), (1000 * LOCK_TTL) / 2)
  }

  async release() {
    clearInterval(this.daemon)
    this.locked = false
    return this.lock.unlock()
  }
}
