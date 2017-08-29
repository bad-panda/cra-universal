var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: [
        'react',
        'react-dom'
      ]
    })
  ],
  node: {
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
        options: {
          presets: ['env', 'react-app'],
          plugins: [
            'dynamic-import-node',
            [require.resolve('babel-plugin-import-inspector'), {
              serverSideRequirePath: true,
              webpackRequireWeakId: true
            }]
          ]
        }
      },
      {
        test: /\.(css|svg)?$/,
        loaders: 'null-loader'
      }
    ],
  },
  plugins: process.env.NODE_ENV === 'production' ? [
      new webpack.optimize.UglifyJsPlugin()
    ] : [
      new NodemonPlugin()
    ]
}
