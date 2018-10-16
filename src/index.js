import '@babel/polyfill';
import 'nprogress/nprogress.css';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import {validate} from 'utils';
import './index.less';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: false,
  }),
  history: createHistory(),
  onError(e, dispatch) {
    const msgs = document.querySelectorAll('.ant-message-notice');
    if (msgs.length < 1) {
      // console.log(e);
    }
  },
});
// 2. Plugins
// app.use();

// 3. Model
app.model(require('./models/global').default);
app.model(require('./models/profile').default);
app.model(require('./models/user').default);


// 4. Router
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

export default app._store;