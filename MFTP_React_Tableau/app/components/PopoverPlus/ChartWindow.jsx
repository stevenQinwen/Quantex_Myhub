import React from 'react';
import ReactDOM from 'react-dom';
import Drag from './Drag';

export default function ChartWindow(config, defaultPosition) {
  let props = Object.assign({
    visible: true
  }, config);
  let div = document.createElement('alert');
  // 获取当前页Dom
  document.body.appendChild(div);

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
  }

  ReactDOM.render(<Drag onClose={close.bind(this, { triggerCancel: true })} {...props} defaultPosition={defaultPosition} />, div);

  return {
    destroy: close,
  };
}
