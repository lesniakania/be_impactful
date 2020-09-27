const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackLoaders = require("./webpack-loaders");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  module: {
    rules: webpackLoaders,
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    // for requiring js file with proper hash in index.html
    new HtmlWebpackPlugin(),
    new Dotenv(),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
};
