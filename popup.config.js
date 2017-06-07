module.exports = {
  entry: './build/popup.js',
  output: {
    path: __dirname,
    filename: './build/popupCompiled.js'
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