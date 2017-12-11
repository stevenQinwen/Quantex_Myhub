import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Store from './Store';
import styles from './index.scss';

class Dashboard extends Component {
  store = new Store(this.props.onChange);
  componentDidMount() {
    this.store.dashboard = this;
  }
  getChildContext() {
    return {
      dStore: this.store,
    };
  }
  render() {
    const { children, className } = this.props;
    const rootClass = classnames({
      [styles.root]: true,
      "dashboard-box": true,
      [className]: className
    });
    return (
      <div className={rootClass} onDragOver={(e) => { e.preventDefault();/* 不写的话，拖动的时候鼠标是禁用的样子 */ }}>
        {children}
      </div>
    );
  }
}

Dashboard.childContextTypes = {
  dStore: PropTypes.object,
};

export default Dashboard;
