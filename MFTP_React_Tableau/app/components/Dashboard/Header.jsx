import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './index.scss';

class Header extends Component {
  render() {
    const { children, className } = this.props;
    const { dragDisabled } = this.context;
    const rootClass = classnames({
      [styles.header]: !dragDisabled,
      "header-of-dashboard": true,
      [className]: className
    });
    return (
      <div
        className={rootClass}
        onMouseEnter={() => { this.context.changeDraggable(true); }}
        onMouseLeave={() => { this.context.changeDraggable(false); }}
      >
        {children}
      </div>
    );
  }
}

Header.contextTypes = {
  panelKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  changeDraggable: PropTypes.func,
  dragDisabled: PropTypes.bool,
};

export default Header;
