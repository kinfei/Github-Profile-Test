import {loginOAuth, postOAuth, checkOAuth} from 'services/api';
import store from 'store2';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import {commonReducers} from './common';
import { AUTH_CONFIG } from './user_auth_var';

const INITIAL_STATE = {
  githubCode: '',
  accessToken: '',
  tokenType: '',
};

export default {
  namespace: 'userModel',
  state: INITIAL_STATE,
  reducers: {
    ...commonReducers(INITIAL_STATE),
  },
  effects: {
    *loginOAuth(payloadObj, {put, call, select}) {
      const params = {
        client_id: AUTH_CONFIG.clientId,
        scope: AUTH_CONFIG.email,
      };

      window.location.href = `https://github.com/login/oauth/authorize?${queryString.stringify(
        params,
      )}`;
    },
    *postOAuth({code}, {put, call, select}) {
      const {userModel} = yield select(state => state);
      const params = {
        client_id: AUTH_CONFIG.clientId,
        client_secret: AUTH_CONFIG.clientSecret,
        code: userModel.githubCode,
      };

      const data = yield call(postOAuth, params);
      if (data) {
        const {access_token, token_type, error} = queryString.parse(data);

        if (error) {
          yield put(routerRedux.push('/'));
        }

        if(access_token)
        {
          store.set('accessToken', access_token);
          yield put({
            type: 'updateState',
            payload: {
              accessToken: access_token,
              tokenType: token_type,
            },
          });
        }

        yield put(routerRedux.push('/main'));
      } else {
        yield put(routerRedux.push('/'));
      }
    },
    *checkOAuth({code}, {put, call, select}) {
      const {userModel} = yield select(state => state);

      const {accessToken} = userModel;

      if (accessToken) {
        const data = yield call(checkOAuth, {
          clientId: AUTH_CONFIG.clientId,
          accessToken,
        });

        console.log({data});
      } else {
        yield put(routerRedux.push('/'));
      }
    },
  },
};
