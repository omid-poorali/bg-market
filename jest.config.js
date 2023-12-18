export default {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleDirectories: ['node_modules', './src'],
    rootDir: './src'
};
