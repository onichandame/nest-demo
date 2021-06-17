import { TestModule, createRandomStr } from './base.test-util';
import { Document } from './types';
import { User } from './user';
import { Credential } from './credential';

describe(__filename, () => {
  let testMod: TestModule;
  let user: Document<User>;
  beforeAll(async () => {
    testMod = await TestModule.create({ entities: [Credential, User] });
    const svc = testMod.getQueryService(User);
    user = await svc.createOne({ name: createRandomStr() });
  }, 1000 * 60);
  afterAll(() => TestModule.close(testMod));

  it(`can hash password on creation or update`, async () => {
    let password = createRandomStr();
    const svc = testMod.getQueryService(Credential);
    let doc = await svc.createOne({ password, user });
    // check if password is not stored in plain text
    expect(doc.password).not.toEqual(password);
    const checkCredential = (doc: Document<Credential>, password: string) => {
      expect(doc.validatePass(password)).toBeTruthy();
      expect(doc.validatePass(doc.password)).toBeFalsy();
      expect(doc.validatePass(createRandomStr())).toBeFalsy();
    };
    // check if password validation works for creation
    checkCredential(doc, password);
    const id = doc.id;
    password = createRandomStr();
    doc = await svc.updateOne(id, { password });
    // check if password validation works for update
    checkCredential(doc, password);
  });
});
