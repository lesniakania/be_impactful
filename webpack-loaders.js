module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader"
    }
  },
  {
    test: /\.css$/i,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }]
  },
  {
    test: /\.svg$/,
    loader: "svg-url-loader"
  }
];
