/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/tests", "<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/src$1",
    "^~types$": "<rootDir>/src/types/index",
    "^~utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsx",
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    },
  },
};
