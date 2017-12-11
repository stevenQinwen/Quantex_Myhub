/**
 * Created by sharon on 17/3/21.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Alert from './Alert';

export default function confirm(data, config) {
  let props = Object.assign({
    visible: true
  }, config);
  let div = document.createElement('alert');
  // 获取当前页Dom
  let alertContainer = config.container;
  alertContainer.appendChild(div);

  function close(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args && args.length &&
      args.some((param) => { return param && param.triggerCancel; });
    if (props.onClose && triggerCancel) {
      props.onClose(...args);
    }
    // 弹框关闭后检查下当前页面id所对应的弹框队列是否还有未弹出的框,有则继续弹出
    Alert.shiftAlert(alertContainer);
  }

  ReactDOM.render(<Alert onClose={close.bind(this, { triggerCancel: true })} alertInfo={data} {...props}/>, div);

  return {
    destroy: close,
  };
}
