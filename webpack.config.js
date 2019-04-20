const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    filename: './build/bundle.js',
  },
  resolve: {
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  },
  watchOptions: {
    poll: true,
  },
  module: {
    rules: [
      { test: /\.example$/, use: 'raw-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'es2017', 'stage-2'],
          plugins: ['transform-runtime',
              ['module-resolver', {
              'root': ['src'],
            }]
          ],
        },
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};