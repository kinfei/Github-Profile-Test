import '@babel/polyfill';
import 'nprogress/nprogress.css';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import {validate} from 'utils';
import './index.less';

const app = dva({
  ...createLoading({
    effects: false,
  }),
  history: createHistory(),
});
app.model(require('./models/global').default);
app.model(require('./models/profile').default);
app.model(require('./models/user').default);
app.router(require('./router').default);

app.start('#root');

validate.getDeviceToken
  .then(deviceToken => {
    app.model({
      namespace: 'appModel',
      state: {deviceToken},
    });
    app.start('#root');

    return app;
  })
  .catch(err => {
    throw new Error(err);
  });
