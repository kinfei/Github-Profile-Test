import store from 'store2';
import {commonReducers} from './common';

const INITIAL_STATE = {
  collapsed: store.get('collapsed') || false,
  notices: [],
  allBanksList: undefined,
  bankInPlugins: undefined,
  bankOutPlugins: undefined,
  bankInList: undefined,
  bankOutList: undefined,
};

export default {
  namespace: 'globalModel',
  state: INITIAL_STATE,
  effects: {},
  reducers: {
    ...commonReducers(INITIAL_STATE),
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {        
        if (pathname.includes('bank')) {
          dispatch({type: 'checkIsBankPluginsEmpty'});
        }
      });
    },
  },
};
