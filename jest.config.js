/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    // All imported modules in your tests should be mocked automatically
    // automock: false,

    // Stop running tests after `n` failures
    // bail: 0,

    // The directory where Jest should store its cached dependency information
    // cacheDirectory: "/tmp/jest_rs",

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    collectCoverage: true,

    // An array of glob patterns indicating a set of files for which coverage
    // information should be collected
    collectCoverageFrom: [
        'src/**/*.ts',
        // '**/*.{js,jsx}',
        // '!**/node_modules/**',
        // '!**/vendor/**',
    ],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    coverageThreshold: {
        global: {
            branches: 35,
            functions: 50,
            lines: 50,
            statements: 50,
        },
    },

};
