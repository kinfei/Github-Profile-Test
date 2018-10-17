
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
// const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

const appSrc = resolveApp('src');
// config after eject: we're in ./config/
module.exports = {
  assets: path.resolve(appSrc, 'assets'),
  components: path.resolve(appSrc, 'components'),
  containers: path.resolve(appSrc, 'containers'),
  services: path.resolve(appSrc, 'services'),
  layout: path.resolve(appSrc, 'layout'),
  models: path.resolve(appSrc, 'models'),
  utils: path.resolve(appSrc, 'utils'),
  theme: resolveApp('config/theme.js'),
  dotenv: resolveApp('.env'),
  appDist: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc,
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
};
