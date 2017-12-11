import React from 'react';

const styles = require('./index.scss');

class NotfoundComponent extends React.Component {
  render() {
    return (
      <div className={styles['align-center']}>
        <h1 className={styles['align-center']}>
          404
        </h1>
        <div>抱歉，此功能未实现</div>
      </div>
    );
  }
}

NotfoundComponent.defaultProps = {
};

export default NotfoundComponent;
