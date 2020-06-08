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
    "\\.  (jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy"
  },

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/index.tsx",
    "!src/**/*.d.ts"
  ]
};
