import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import App from './index.js';

jest.mock('containers/SampleReport/');

describe('App Test', () => {

  const initialState = {
    appModel: {deviceToken: 10},
    loginModel: {infoText: 'Welcome to Web Boilerplate'},
  };
  let store;

  beforeEach(() => {

    const mockStore = configureStore();
    store = mockStore(initialState);
  });

  it('Test App Index Match Snapshot', () => {
    const appPage = shallow(<App store={store} />);
    expect(appPage).toMatchSnapshot();
  });

  it('Test App Index Match Store value', () => {

    const mockStore = configureStore();

    const innerStore = mockStore( {
      appModel: {deviceToken: 10},
      loginModel: {infoText: 'Welcome to Web Boilerplate'},
      loading: false,
    });
    
    const appPage = mount(<App store={innerStore} />);
    expect(
      appPage.contains(
        <div className="App_Body">Welcome to Web Boilerplate</div>,
      ),
    ).toBe(true);
  });
  
});
