import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { ModelModule } from './model.module';

describe(__filename, () => {
  let testApp: INestApplication;

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      imports: [ModelModule],
    }).compile();
    testApp = mod.createNestApplication();
  });

  afterAll(async () => testApp?.close());
});
