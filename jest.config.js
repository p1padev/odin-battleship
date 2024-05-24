module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.+(js|jsx)", "**/?(*.)+(spec|test).+(js|jsx)"],
  moduleFileExtensions: ["js", "jsx"],
};
