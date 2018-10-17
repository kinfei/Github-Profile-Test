module.exports = {
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,mjs}"
  ],
  rootDir: '../../',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "!node_modules/"
  ],
  // transformIgnorePatterns: ['<rootDir>/node_modules/(?!(redux-persist)/)'],
  cacheDirectory: './cache',
  globals: {
    NODE_ENV: 'test',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'less'],
  moduleDirectories: ['node_modules', 'src', './'],
  moduleNameMapper: {
    "^components(.*)$": "<rootDir>/src/components$1",
    "^containers(.*)$": "<rootDir>/src/containers$1",
    '^.+\\.(css|scss|less)$': 'identity-obj-proxy',
    '^(.+\\.(jpe?g|png|gif|ttf|eot|svg|md)|bootstrap.*)$':
      '<rootDir>/config/jest/__setup__/fileMock.js',
    '^(expose|bundle)': '<rootDir>/config/jest/__setup__/moduleMock.js',
  },
  // setupTestFrameworkScriptFile: 'jest-enzyme/lib/index.js',
  setupTestFrameworkScriptFile: "<rootDir>/config/jest/setupTest.js",
  testEnvironment: 'jest-environment-jsdom-global',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|jsx|json|less)$',
  testURL: 'http://localhost:3000',
  verbose: true,
  // coverageThreshold: {
  //   global: {
  //     branches: 65,
  //     functions: 65,
  //     lines: 65,
  //     statements: 65,
  //   },
  // },
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   'src/**/*.{js,jsx}',
  // ],
};
