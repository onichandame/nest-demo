import { Test } from '@nestjs/testing';

import { MockMongoService } from './mock.mongo.service';

describe(__filename, () => {
  it(`should start a mongo server and terminates on module destroy`, async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MockMongoService],
    }).compile();
    const svc = await moduleRef.resolve(MockMongoService);
    expect(await svc.getUri()).toBeTruthy();
    await moduleRef.close();
  });
});
