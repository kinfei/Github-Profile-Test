import React, {PureComponent} from 'react';
import {Button} from 'antd';
import 'antd/lib/button/style/css';
import css from './index.less';

class ButtonComponent extends PureComponent {
  render() {
    const addProps = {...this.props};
    return (      
      <Button
        icon="github"
        type="Default"
        {...addProps}
      >
        Login Github
      </Button>
    );
  }
}

export default ButtonComponent;
