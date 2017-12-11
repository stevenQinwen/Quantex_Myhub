import React from 'react';
import { Button, Icon, Tooltip } from 'antd';
import Clipboard from 'clipboard';
import className from 'classnames';

const styles = require('./index.scss');

class Alert extends React.Component {

  state = {
    tooltip: {
      visible: false
    }
  };

  componentDidMount() {
    // 组件加载完成focus第一个按钮
    this.oKFocus();
   // 点击'复制异常详情'按钮复制信息
    let clipboard = new Clipboard('.page-container-visible .btn-for-copy');
    // 复制成功后消失tips
    clipboard.on('success', (e) => {
      this.setState({
        tooltip: {
          visible: true
        }
      });
      // 3s后消失tips
      this.timer = setTimeout(() => {
        this.setState({
          tooltip: {
            visible: false
          }
        });
      }, 2000);

      e.clearSelection();
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  close = () => {
    this.props.onClose();
  };

  // 关闭弹框
  handleClose = () => {
    if (!this.props.onClose) {
      this.close();
    } else {
      this.props.onClose(() => {
        this.close();
      });
    }
  };

  handleOk = () => {
    if (!this.props.onOk) {
      this.close();
    } else {
      this.props.onOk(() => {
        this.close();
      });
    }
  };

  handleCancel = () => {
    if (!this.props.onCancel) {
      this.close();
    } else {
      this.props.onCancel(() => {
        this.close();
      });
    }
  };

  // ESC 键, 关闭窗口
  // 左右方向键，切换“取消”和“确定”按钮
  onKeyDown = (e) => {
    switch (e.keyCode) {
      case 27: // ESC
        this.handleOk();
        break;
      case 37: // ArrowLeft
        this.cancelFocus();
        e.preventDefault();
        e.stopPropagation();
        break;
      case 39: // ArrowRight
        this.oKFocus();
        e.preventDefault();
        e.stopPropagation();
        break;
      default:
        break;
    }
  };

  /**
   * 获取错误详情等信息
   * @param alertInfo
   * @returns {Array}
   * @private
   */
  _getDescription = (alertInfo) => {
    let description = [];
    if (alertInfo.code !== 200) {
      if (alertInfo.hasOwnProperty('msgInfo')) {
        description.push(<dl key="msgInfo"><dd>{alertInfo.msgInfo}</dd></dl>);
      }
      if (alertInfo.hasOwnProperty('requestId')) {
        description.push(<dl key="requestId"><dt>请求ID:</dt><dd>{alertInfo.requestId}</dd></dl>);
      }
      if (alertInfo.hasOwnProperty('msgDetail')) {
        description.push(<dl key="msgDetail"><dt>异常详情:</dt><dd className="msgDetail">{alertInfo.msgDetail}</dd></dl>);
      }
    }

    return description;
  }

  oKFocus = () => {
    this.refs.alertBtnGroup.children[this.refs.alertBtnGroup.children.length - 1].focus();
  }

  cancelFocus = () => {
    this.refs.alertBtnGroup.children[0].focus();
  }

  render() {
    // 组件可配置项
    const { alertInfo, mask, type, showIcon, iconType, style, okText, cancelText } = this.props;
    const { tooltip } = this.state;
    // 错误信息相关描述
    const description = alertInfo && this._getDescription(alertInfo);

    // alert 弹框不同样式
    const alertClass = className({
      'alert': true,
      'alert-success': type === 'success',
      'alert-error': type === 'error',
      'alert-info': type === 'info',
      'alert-warning': type === 'warning',
    });

    return (
      <section className={styles.dialog} onKeyDown={this.onKeyDown}>
        { mask ? <div className={styles.mask}/> : null }
        <div className={styles.wrap}>
          <div className={alertClass} style={style}>
            <div className={styles.body}>
              { showIcon ? <Icon type={iconType} className="alert-icon"/> : null }
              <h3 className="alert-message">{alertInfo.msg}</h3>
              <div className="alert-description">
                { description }
              </div>
            </div>
            <div className={styles.footer}>
              <div className="alert-btn-group" ref="alertBtnGroup">
                {
                  alertInfo.msgDetail != null ?
                    <Tooltip placement="bottom" title="已复制!" trigger="click" visible={tooltip.visible}>
                      <Button size="small" className='btn-for-copy' data-clipboard-target=".page-container-visible .msgDetail">复制异常详情</Button>
                    </Tooltip> : null
                }
                {
                  cancelText ? <Button size="small" onClick={this.handleCancel}>{ cancelText }</Button> : null
                }
                <Button type="primary" size="small" onClick={this.handleOk}>{ okText }</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Alert.propTypes = {
  visible: React.PropTypes.bool,
  mask: React.PropTypes.bool, // 遮罩层
  style: React.PropTypes.object, // 弹框宽度等样式
  type: React.PropTypes.string, // 弹框类型: warning, error, success, info
  onClose: React.PropTypes.func,
};

Alert.defaultProps = {
  visible: true,
  mask: true,
  style: { width: 416 },
  showIcon: true,
  type: 'success',
  keyboard: true,
};

export default Alert;
