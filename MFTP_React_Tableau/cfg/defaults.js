/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const srcPath = path.join(__dirname, '/../app');
const theme = require('../antdtheme');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoPrefixer = require('autoprefixer');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        enforce: "pre",
        loader: 'eslint-loader'
      }, {
        test: /\.html$/,
        include: srcPath,
        enforce: "pre",
        loader: 'htmlhint'
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.sass/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:5]',
              minimize: true
            }
          }, {
            loader: 'csslint-loader'
          }, {
            loader: 'sass-loader',
            options: {
              outputStyle: {
                expanded: true
              },
              includePaths: [srcPath],
              data: '@import "styles/core/variables";'
            }
          }
        ],
      }, {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:5]',
              minimize: true
            }
          }, {
            loader: 'csslint-loader'
          }, {
            loader: 'sass-loader',
            options: {
              outputStyle: {
                expanded: true
              },
              includePaths: [srcPath],
              data: '@import "styles/core/variables";'
            }
          }
        ],
      }, {
        test: /\.less/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }, {
        test: /\.less/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: "happypack/loader?id=antd-css"
        })
      }, {
        test: /\.html/,
        loader: 'html-loader'
      }, { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'fonts/[name:md5].[ext]'
        }
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },{
        test: /\.(png|jpg|gif|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }, {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  };
}

/**
 * Get the default plugins object for webpack
 * @return {Object}
 */
function getDefaultPlugins() {
  return [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.join(__dirname, '/../'),
        debug: true,
        // 关闭自动补齐浏览器样式前缀的功能
        // postcss: [
        //   autoPrefixer(),
        // ],
        htmlhint: {
          configFile: './.htmlhintrc'
        },
      }
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '/../'),
      manifest: require('../manifest.json'),
    }),
    new ExtractTextPlugin({
      filename: 'antd.css',
      disable: false,
      allChunks: true
    }),
    new ProgressBarPlugin({
      width: 50,
      format: chalk.magenta.bold('build bundle process ') + chalk.cyan.bold(':percent') + chalk.yellow.bold(' (:elapsed seconds)'),
      clear: false
    }),
    new CopyWebpackPlugin([{
      from: 'app/styles/core/themes/*.css',
      to: 'themes/[name].[ext]'
    }, {
      from: 'app/styles/core/tools/iconfont/antfont',
      to: 'antfont'
    }, {
      from: 'build/lib.js',
      to: ''
    }, {
      from: 'app/_config/dist/api.js',
      to: ''
    }, {
      from: 'app/images/icons',
      to: 'icons'
    }]),
    new HappyPack({
      id: 'antd-css',
      loaders: [{
        path: 'css-loader',
        query: {
          url: false
        }
      }, {
        path: 'less-loader',
        query: {
          sourceMap: true,
          modifyVars: theme
        }
      }],
      threadPool: happyThreadPool
    })
  ]
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  getDefaultModules,
  getDefaultPlugins,
  happyThreadPool
};
