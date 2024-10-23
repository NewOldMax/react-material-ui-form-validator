const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    '@babel/polyfill',
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
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8082,
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
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-optional-chaining',
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
  devtool: 'eval-cheap-source-map'
};