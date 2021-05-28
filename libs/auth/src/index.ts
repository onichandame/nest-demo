import { verify, sign } from 'jsonwebtoken';
import * as yup from 'yup';

import { publicKey, privateKey, algorithm } from './secrets';

const PayloadSchema = yup
  .object({ id: yup.string().required(), name: yup.string().required() })
  .required();

export const encode = async (payload: yup.Asserts<typeof PayloadSchema>) => {
  await PayloadSchema.validate(payload);
  return sign(payload, privateKey, { algorithm });
};
export const decode = (token: string) =>
  PayloadSchema.validate(verify(token, publicKey, { algorithms: [algorithm] }));

export * from './auth';
