/* eslint-disable prefer-const */
import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import Button from 'components/Button';
import css from './index.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  componentDidMount() {
  }
  onLogin = () => {
    this.dispatch({
      type: 'userModel/loginOAuth',
    });
  };
  render() {
    return (
      <Fragment>
        <div className={css.applicationtitle}>
          <h1>Github Profile Test</h1>
        </div>
        <div className={css.loginbutton}>
          <Button onClick={this.onLogin}>Login Github</Button>
        </div>
      </Fragment>
    );
  }
}

export default connect()(App);
