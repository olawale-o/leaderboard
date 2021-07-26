const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  plugin: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      title: 'Leader Board',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    /* eslint-disable */
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  }
};