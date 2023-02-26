
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    test: './tests/test.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.test\.js$/,
        use: 'jest-webpack-alias',
      },
    ],
  },
  devtool: 'source-map',
};