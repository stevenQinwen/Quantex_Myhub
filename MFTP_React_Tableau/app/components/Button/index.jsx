import React from 'react';
import { Button } from 'antd';

class ButtonComponent extends React.Component {

  handleProps = (btnCode) => {
    let btnInfo = window.btnCodeMap.get(btnCode);
    let props = {};
    if (btnInfo == null) {
      props.hidden = true;
    }
    return props;
  };

  render() {
    let props = this.handleProps(this.props.btnCode);
    return (
      !props.hidden ? (
        <Button {...this.props} {...props}>
          {this.props.children}
        </Button>
      ) : null
    );
  }
}

ButtonComponent.defaultProps = {
  size: 'small'
};

export default ButtonComponent;
