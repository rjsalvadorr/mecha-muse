process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  // transformIgnorePatterns: [
  //   "node_modules/lodash",
  // ],
}
