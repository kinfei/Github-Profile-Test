import React from 'react';
import {
  Router, Switch, Route
} from 'dva/router';
import Dynamic from 'dva/dynamic';
import CallBack from './containers/CallBack';

function RouterConfig({
  history, app
}) {
  const App = Dynamic({
    app,
    component: () => import('./containers/App/')
  });

  const ErrorPage = Dynamic({
    app,
    component: () => import('./components/Error')
  });

  const Main = Dynamic({
    app,
    component: () => import('./containers/Main/')
  });

  return (
    <Router history={history}>
        <Switch>
            <Route path="/main" component={Main}/>
            <Route exact path="/github/callback" component={CallBack} />
            <Route exact path="/error" component={ErrorPage}/>
            <Route exact path="/" component={App} />
        </Switch>
    </Router>
  );
}

export default RouterConfig;