/* eslint-disable prefer-const */
import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import queryString from 'query-string';


class CallBack extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  componentDidMount() {
    const {accessToken} = this.props;
    const {code} = queryString.parse(window.location.search);

    if(accessToken === '')
    {
      this.dispatch({
        type: 'userModel/updateState',
        payload: {
          githubCode: code,
        },
      });
  
      this.dispatch({
        type: 'userModel/postOAuth',
      });
    }
  }
  render() {
    return (
      <Fragment />
    );
  }
}

const mapStatesToProps = ({userModel}) => ({
  ...userModel,
});

export default connect(mapStatesToProps)(CallBack);
