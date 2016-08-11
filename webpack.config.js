module.exports = {
  entry: {
    'react-menu': './lib/index.js'
  },

  output: {
    library: "ReactMenu",
    libraryTarget: "umd",
    filename: '[name].js',
    path: 'dist',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread'],
        },
      }
    ]
  },
};
