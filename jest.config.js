module.exports = {
    moduleNameMapper: {
      // Map any imported modules to their actual file location in your project
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      // Use the babel-jest transformer to transform all JS code in the project
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      // Ignore any files or folders in the node_modules directory
      '/node_modules/',
    ],
    
  };
  