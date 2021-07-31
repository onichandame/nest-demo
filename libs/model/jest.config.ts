import { JestTypes } from '@nest-libs/deps';

export default {
  verbose: true,
  preset: `ts-jest`,
  testEnvironment: `node`,
  maxWorkers: 4,
} as JestTypes.Config.InitialOptions;
