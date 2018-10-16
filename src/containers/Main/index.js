/* eslint-disable prefer-const */

import {Redirect, Link, Switch, Route} from 'dva/router';
import React, {Component, Fragment} from 'react';
import { Layout, Menu } from 'antd';
import 'antd/lib/menu/style/css';
import {connect} from 'dva';
import UserProfile from './UserProfile';
import Repo from './Repo';

const { Header } = Layout;

class Logon extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }
  componentDidMount() {
    // this.dispatch({
    //   type: 'userModel/checkOAuth',
    // });
  }
  render() {
    // return <div>Logon </div>;
    return (
      
      <div>
        <Layout className="layout">
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Link to="/main/profile">Github Profile</Link>
                </Menu.Item>
              <Menu.Item key="2">
                <Link to="/main/repo">Repositories</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/" >Logout</Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        
        <Switch>
          <Route exact path="/main/profile" component={UserProfile} />
          <Route exact path="/main/repo" component={Repo} />          
          <Redirect from="/main" exact to="/main/profile" />
        </Switch>
      </div>
    );
  }
}

const mapStatesToProps = ({loginModel, appModel, loading}) => ({
  ...loginModel,
  loading,
});

export default connect(mapStatesToProps)(Logon);

