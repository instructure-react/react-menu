module.exports = {
  entry: "./app.js",
  output: {
    filename: "app-bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
