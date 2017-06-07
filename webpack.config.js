module.exports = {
  entry: './build/script.js',
  output: {
    path: __dirname,
    filename: './build/bundle.js'
  },
  module: {
    loaders: [
    { 
      test: /\.js$/,
      loader: 'babel-loader'
    }
    ]
  },
  devtool: 'source-map'
};