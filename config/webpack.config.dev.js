/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.base');
const webpack = require('webpack');
const path = require('path');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const getClientEnvironment = require('./env');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = merge.smart(webpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: [
    require.resolve('./polyfills'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],
  output: {
     // Add /* filename */ comments to generated require()s in the output.
     pathinfo: true,
     // This does not produce a real file. It's just the virtual path that is
     // served by WebpackDevServer in development. This is the JS bundle
     // containing code from all our entry points, and the Webpack runtime.
     filename: 'static/js/bundle.js',
     // There are also additional JS chunk files if you use code splitting.
     chunkFilename: 'static/js/[name].chunk.js',
     // This is the URL that app is served from. We use "/" in development.
     publicPath,
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      PUBLIC_URL: paths.app,
    }),
    new InterpolateHtmlPlugin(env.raw),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(env.stringified),
  ],
});