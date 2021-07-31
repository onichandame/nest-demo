import { Typegoose } from '@nest-libs/deps';

import { TestModule, createRandomStr } from './base.test-util';
import { User } from './user';
import { Credential } from './credential';

describe(__filename, () => {
  let testMod: TestModule;
  let user: Typegoose.DocumentType<User>;
  beforeAll(async () => {
    testMod = await TestModule.create({ entities: [Credential, User] });
    const model = testMod.getModel(User);
    user = await model.create({ name: createRandomStr() });
  }, 1000 * 60);
  afterAll(() => TestModule.close(testMod));

  it(`can hash password on creation or update`, async () => {
    let password = createRandomStr();
    const model = testMod.getModel(Credential);
    let doc = await model.create({ password, user });
    // check if password is not stored in plain text
    expect(doc.password).not.toEqual(password);
    const checkCredential = (
      doc: Typegoose.DocumentType<Credential>,
      password: string
    ) => {
      expect(doc.validatePass(password)).toBeTruthy();
      expect(doc.validatePass(doc.password)).toBeFalsy();
      expect(doc.validatePass(createRandomStr())).toBeFalsy();
    };
    // check if password validation works for creation
    checkCredential(doc, password);
    const id = doc.id;
    password = createRandomStr();
    doc = await model
      .findByIdAndUpdate(id, { password }, { new: true })
      .orFail(new Error(`doc not found`))
      .exec();
    // check if password validation works for update
    checkCredential(doc, password);
  });
});
