/**
 * Jest test setup file
 * Runs before each test file
 */

import "@testing-library/jest-dom";

// Mock chrome API for tests
global.chrome = {
  runtime: {
    connect: jest.fn(),
    onConnect: {
      addListener: jest.fn(),
    },
    onMessage: {
      addListener: jest.fn(),
    },
    sendMessage: jest.fn(),
    getContexts: jest.fn(),
    getURL: jest.fn((path) => `chrome-extension://test-id/${path}`),
  },
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
      clear: jest.fn(),
    },
  },
  offscreen: {
    createDocument: jest.fn(),
    closeDocument: jest.fn(),
    hasDocument: jest.fn(),
  },
} as any;

// Mock Worker for tests
global.Worker = class Worker {
  constructor(public url: string | URL) {}
  postMessage = jest.fn();
  terminate = jest.fn();
  addEventListener = jest.fn();
  removeEventListener = jest.fn();
  dispatchEvent = jest.fn();
  onmessage = null;
  onerror = null;
  onmessageerror = null;
} as any;

// Suppress console errors in tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Not implemented: HTMLFormElement.prototype.submit")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
