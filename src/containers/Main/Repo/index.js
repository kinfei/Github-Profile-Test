/* eslint-disable prefer-const */
import React, {Component, Fragment} from 'react';
import _ from 'lodash';
import { Card } from 'antd';
import 'antd/lib/card/style/css';
import 'antd/lib/card/style/css';
import store from 'store2';
import {connect} from 'dva';
import './index.less'

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  componentDidMount() {
    let repoUser = '';

    if (store.get('username')) {
      repoUser = store.get('username');
    }

    this.dispatch({
      type: 'profileModel/getRepoFromUser',
      user: repoUser,
    });
  }

  renderRepo() {
    const {repoData} = this.props;

    if (repoData != null) {
      return _.map(
        repoData,
        ({full_name, description, created_at, language, html_url, watchers_count, forks} , index) => {
          return (
            <div key={`repo_${index}`} style={{ background: '#ECECEC', padding: '30px' }}>
              <Card title={`Repository name: ${full_name}`} bordered={false} style={{ flex: 0.8 }}>
                <p>{`Description: ${description}`}</p>
                <p>{`Created: ${created_at}`}</p>
                <p>{`Language: ${language}`}</p>
                <p>{`Watcher(s): ${watchers_count}`}</p>
                <p>{`Fork(s): ${forks}`}</p>
                <p><a href={html_url} target="_blank">View Repo</a></p>
              </Card>
            </div>   
          );
        },
      );
    }

    return <div>No data.</div>;
  }
  render() {
    const {profileData} = this.props;

    if (profileData != null) {
      return (
        <div>
          <div>{this.renderRepo()}</div>
        </div>
      );
    }

    return <div>No data.</div>;
  }
}

const mapStatesToProps = ({profileModel}) => ({
  ...profileModel,
});

export default connect(mapStatesToProps)(UserProfile);
