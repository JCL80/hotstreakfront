/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // ⬇️ tell Jest that "@/foo" means "<rootDir>/src/foo"
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // the transform block is fine as-is, or you can keep ts-jest’s preset default
};
