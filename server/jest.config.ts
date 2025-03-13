import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',  // Matches any files ending with `.spec.ts`
  transform: {
    '\\.ts?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/node_modules/**',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',  // Use Node.js environment for testing
  coveragePathIgnorePatterns: [
    '/src/_migrations',
    '/node_modules/',
    '/dist/',
    '/test/',
    '/config/',
  ],  // Ignore coverage for certain directories
  coverageReporters: ['text', 'lcov', 'clover'],  // Coverage reporting options
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  clearMocks: true,
  testTimeout: 100000,
};

export default config;
