import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { MongoConnectionModule } from './mongo.module';

describe(MongoConnectionModule.module.name, () => {
  let app: INestApplication;

  test(`can create connection to database in unittest environment`, async () => {
    console.log(`hi`);
    const moduleRef = await Test.createTestingModule({
      imports: [MongoConnectionModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    expect(app).toBeTruthy();
    await app.close();
  });
});
