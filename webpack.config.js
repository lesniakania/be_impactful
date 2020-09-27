const webpackLoaders = require("./webpack-loaders");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: webpackLoaders,
  },
  plugins: [new Dotenv()],
};
