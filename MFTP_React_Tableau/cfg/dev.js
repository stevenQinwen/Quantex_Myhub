'use strict';

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const defaultSettings = require('./defaults');
const PORT = require('../app/_config/dev/api').port;

// Add needed plugins here
// const BowerWebpackPlugin = require('bower-webpack-plugin');
const HappyPack = require('happypack');

let config = Object.assign({}, baseConfig, {
  entry: [
    'react-hot-loader/patch', // RHL patch
    'babel-polyfill',
    'webpack-dev-server/client?http://127.0.0.1:' + PORT.devServer,
    'webpack/hot/only-dev-server',
    './app/index'
  ],
  cache: true,
  devtool: 'eval',
  plugins: defaultSettings.getDefaultPlugins().concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]),
  module: defaultSettings.getDefaultModules()
});

// use happyPack
config.plugins.push(
  new HappyPack({
    id: 'react-babel',
    loaders: [{
      path: 'babel-loader',
      query: {
        cacheDirectory: true
      }
    }],
    threadPool: defaultSettings.happyThreadPool
  })
);

// Add needed loaders to the defaults here
config.module.rules.push({
  test: /\.(js|jsx)$/,
  loader: 'happypack/loader?id=react-babel',
  include: [ path.join(__dirname, '/../app') ]
});

module.exports = config;
