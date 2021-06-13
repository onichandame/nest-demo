import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Injectable()
export class MockMongoService implements OnModuleDestroy {
  private db?: MongoMemoryServer = undefined;

  private async startReplSet() {
    if (!this.db) {
      this.db = new MongoMemoryServer();
    }
  }

  async getUri() {
    await this.startReplSet();
    const result = await this.db?.getUri();
    if (result) return result;
    else throw new Error(`Mock Mongo server not started properly!`);
  }

  async close() {
    await this.db?.stop();
    this.db = undefined;
  }

  async onModuleDestroy() {
    await this.close();
  }
}
