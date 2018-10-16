/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const moment = require('moment');
const fs = require('fs');
// const gitRev = require('git-rev-sync');

// const time = moment().format('YY/MM/DD HH:mm:ss');
// const ver= gitRev.short();

// const config = {
//   VERSION: `${ver} ${time}`,
// };
// console.log('current version is', config.VERSION);

// fs.writeFile('.version.json', JSON.stringify(config), err => {
//   if (err) throw err;
// });




module.exports = {
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
    ),
    extensions: ['.js', '.jsx', '.json', '.less'],
    alias: {
      src: paths.appSrc,
      assets: paths.assets,
      containers: paths.containers,
      components: paths.components,
      constants: paths.constants,
      layout: paths.layout,
      models: paths.models,
      utils: paths.utils,
      services: paths.services,
      'react-native': 'react-native-web',
    },
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              quiet: true,
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        test: /\.(js|jsx|mjs)$/,
        include: [
          paths.appSrc,
          path.resolve(paths.appNodeModules, 'react-dev-utils'),
          path.resolve(paths.appNodeModules, 'ansi-styles'),
        ],
        loader: 'babel-loader',
        options: {
          plugins: [
            ['import', {libraryName: 'antd', style: true}], // `style: true` 会加载 less 文件
          ],
          cacheDirectory: true,
          presets: ['@babel/preset-env'],
        },
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(css|less)$/,
            exclude: [/node_modules/],
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true, // 开启css modules
                  localIdentName: '[name]__[local]__[hash:base64:5]', // css modules处理后css命名规则
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('less-loader'), // compiles Less to CSS
              },
            ],
          },
          {
            test: /\.(css|less)$/,
            include: [/node_modules/],
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true, // 开启css modules
                  localIdentName: '[local]', // css modules处理后css命名规则
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('less-loader'),
                options: {
                  modifyVars: require(path.resolve(
                    require(paths.appPackageJson).theme,
                  ))(),
                  javascriptEnabled: true
                },
              },
            ],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({PROD: process.env.PROD || false}),
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
};
