import React from 'react';
import ButtonComponent from '../Button';

class AComponent extends ButtonComponent {
  render() {
    let props = this.handleProps(this.props.btnCode);
    return (
      !props.hidden ? (
        <a {...this.props} {...props}>
          {this.props.children}
        </a>
      ) : null
    );
  }
}

export default AComponent;
