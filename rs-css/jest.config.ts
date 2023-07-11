import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  roots: ['<rootDir>/src/components'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.ts'],
};

export default config;
