import type { Config } from 'jest';

export default async (): Promise<Config> => ({
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    './src/**/*.(t|j)s',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    './.+/node_modules',
    './.+/lib',
  ],
  coverageReporters: [
    'text',
    'lcov',
  ],
  testPathIgnorePatterns: [
    './.+/node_modules',
    './.+/lib',
  ],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'configs/tsconfig.base.json',
      },
    ],
  },
});
