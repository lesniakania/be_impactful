const webpackLoaders = require("./webpack-loaders");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: webpackLoaders
  }
};
