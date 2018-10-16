import {omit, pick} from 'lodash';

const commonReducers = ({INITIAL_STATE}) => ({
      updateState(state, {payload}) {
        return {
          ...state,
          ...payload,
        };
      },
      removeState(state, {payload}) {
        const newState = omit(state, payload);
        return {
          ...newState,
        };
      },
      initializeState(state, {payload}) {
        const initialStates = pick(INITIAL_STATE, payload);
        return {
          ...state,
          ...initialStates,
        };
      },
      initializeAll(state, {payload}) {
        let newState = {};
        if (payload) {
          newState = omit(INITIAL_STATE, payload);
        } else {
          newState = INITIAL_STATE;
        }
  
        return {
          ...state,
          ...newState,
        };
      }
});

export {commonReducers};