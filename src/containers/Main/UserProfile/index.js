/* eslint-disable prefer-const */
import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Card } from 'antd';
import 'antd/lib/card/style/css';
import { connect } from 'dva';
import styles from './index.less';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  componentDidMount() {
    this.dispatch({
      type: 'profileModel/getProfile',
    });
  }
  render() {
    const { profileData } = this.props;

    if (profileData) {
      const { avatar_url, name, company, blog, bio } = profileData;
      return (
        <div className={styles.root}>
          
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="avatarURl" src={avatar_url} />}
          >
            <div>Name: {name}</div>
            <div>Company: {company}</div>
            <div>Blog: {blog}</div>
            <div>Bio: {bio}</div>
          </Card>

        </div>
      );
    }

    return <div />;
  }
}

const mapStatesToProps = ({ profileModel }) => ({
  ...profileModel,
});

export default connect(mapStatesToProps)(UserProfile);
