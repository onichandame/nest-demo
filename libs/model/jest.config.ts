import { Config } from '@jest/types';

export default {
  silent: false,
  verbose: true,
  preset: `ts-jest`,
  testEnvironment: `node`,
  maxWorkers: 4,
} as Config.InitialOptions;
