import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { MongoConnectionModule } from './mongo.module';

describe(MongoConnectionModule.module.name, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MongoConnectionModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  }, 1000 * 60 * 5);

  afterAll(async () => {
    await app.close();
  });

  test(`can provide testing database in unittest environment`, async (done) => {
    expect(app).toBeTruthy();
    done();
  });
});
