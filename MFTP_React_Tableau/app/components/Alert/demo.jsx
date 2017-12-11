import React from 'react';
import { Button } from 'antd';
import Alert from 'components/Alert';

class AlertDemo extends React.Component {
  showAlert = () => {
    Alert.success('test');
  };

  showAlert2 = () => {
    Alert.error({
      requestId: 'xxxx',
      msg: 'tst',
      msgInfo: 'xx',
      msgDetail: '这是很长很长的堆栈信息',
      code: 400
    });
  };

  showAlert3 = () => {
    Alert.error('test', (close) => {
      logger.log('close...');
      close();
    });
  };

  showConfirm = () => {
    Alert.confirm('error', {
      okText: '继续',
      cancelText: '中断处理',
      type: 'error',
      iconType: 'cross-circle-o',
      onOk: (close) => {
        logger.log('继续………………');
        close();
      },
      onCancel: (close) => {
        logger.log('中断处理…………');
        close();
      }
    });
  };

  render() {
    return (
        <div>
          <Button type="primary" onClick={this.showAlert}>弹框</Button>
          <Button type="primary" onClick={this.showAlert2}>弹框2</Button>
          <Button type="primary" onClick={this.showAlert3}>弹框3</Button>
          <Button type="primary" onClick={this.showConfirm}>confirm 框</Button>
        </div>
    );
  }
}

export default AlertDemo;
