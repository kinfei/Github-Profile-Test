import {getUser, getRepoFromUser} from 'services/api';
import store from 'store2';
import {commonReducers} from './common';

const INITIAL_STATE = {
  profileData: null,
  repoData: null,
};

export default {
  namespace: 'profileModel',
  state: INITIAL_STATE,
  reducers: {
    ...commonReducers(INITIAL_STATE),
  },
  effects: {
    *getProfile(payloadObj, {put, call, select}) {
      const {userModel} = yield select(state => state);
      
      let accessTokenIn = '';
      if (store.get('accessToken')) {
        accessTokenIn = store.get('accessToken');
        yield put({
          type: 'userModel/updateState',
          payload: {
            accessToken: store.get('accessToken'),
          },
        });
      }
      else
      {
        accessTokenIn = userModel.accessToken;
      }

      const params = {
        access_token: accessTokenIn,
      };
      
      const data = yield call(getUser, params);

      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            profileData: {...data},
          },
        });

        store.set('username', data.login);
      }
    },
    *getRepoFromUser({user}, {put, call, select}) {
      const {userModel} = yield select(state => state);
      
      let accessTokenIn = '';
      if (store.get('accessToken')) {
        accessTokenIn = store.get('accessToken');
        yield put({
          type: 'userModel/updateState',
          payload: {
            accessToken: store.get('accessToken'),
          },
        });
      }
      else
      {
        accessTokenIn = userModel.accessToken;
      }

      const params = {
        access_token: accessTokenIn,
      };
      console.log(user);
      console.log(params);
      const data = yield call(getRepoFromUser, {user, params});
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            repoData: {...data},
          },
        });


        yield put({
          type: 'profileModel/getProfile',
        });
      }
    },
  },
};
