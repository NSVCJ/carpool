var webpack = require('webpack')

module.exports = {
  entry: './public/scripts/app.js',
  output: {
    filename: './public/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
