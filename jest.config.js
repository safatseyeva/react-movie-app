module.exports = {

  roots: ["<rootDir>/src"],

  transform: {
    ".*\.tsx?$": "ts-jest"
  },

  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],

  testRegex: ".*\.test.tsx?$",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|css|less)$": "identity-obj-proxy"
  },

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/index.tsx",
    "!src/**/*.d.ts"
  ],

  coverageThreshold: {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
};
