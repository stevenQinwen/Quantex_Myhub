import confirm from './confirm';
import Alert from './Alert';

function _transParam(msg, fn) {
  return {
    data: typeof msg === 'object' ? msg : { msg: msg },
    options: typeof fn === 'object' ? fn : { onOk: fn }
  };
}

/**
 * 获取 alert container
 * @return {*}
 * @private
 */
function _getAlertContainer() {
  const curPageContainer = document.querySelectorAll('.page-container-visible');
  if (curPageContainer.length) {
    return curPageContainer[0];
  } else {
    return document.body;
  }
}

/**
 * 弹出 alert 框
 * @param alertConfig
 * @return {*}
 * @private
 */
function _showAlert(alertConfig) {
  const { data, config } = alertConfig;
  const alertContainer = config.container;
  let curPageId = alertContainer.id || 'document';
  // 利用document去查找所有 alert 会有 bug, 不过出现的机会几乎为 0
  const alertElement = alertContainer.querySelectorAll('alert');
  if (alertElement.length) {
    // push next alert to current page alert queue
    const curPageAlertQueue = Alert.alertQueueMap.get(curPageId) || [];
    curPageAlertQueue.push(() => {
      confirm(data, config);
    });
    Alert.alertQueueMap.set(curPageId, curPageAlertQueue);
    return {
      destroy: () => {} // 按照 return 的要求返回一个函数
    };
  } else {
    // alert now
    return confirm(data, config);
  }
}

Alert.alertQueueMap = new Map();

Alert.shiftAlert = function shiftAlertQueue(alertContainer) {
  const curPageId = alertContainer.id || 'document';
  const alertQueueMap = Alert.alertQueueMap;
  if (alertQueueMap.has(curPageId) && alertQueueMap.get(curPageId).length) {
    const topAlertFn = alertQueueMap.get(curPageId).shift();
    topAlertFn(); // 先进先出,每次都把第一个弹框弹出
  }
};

Alert.wrappedAlert = function wrappedAlert(alertFn) {
  const alertContainer = _getAlertContainer();
  return (msg, fn) => {
    const options = Object.assign({
      container: alertContainer
    }, typeof fn === 'object' ? fn : {
      onOk: fn
    });
    alertFn(msg, options);
  };
};

Alert.success = function success(msg, fn) {
  const { data, options } = _transParam(msg, fn);
  const config = Object.assign({}, {
    type: 'success',
    iconType: 'check-circle-o',
    okText: '确定',
    container: _getAlertContainer(),
  }, options);
  return _showAlert({
    data,
    config
  });
};

Alert.info = function info(msg, fn) {
  const { data, options } = _transParam(msg, fn);
  const config = Object.assign({}, {
    type: 'info',
    iconType: 'info-circle-o',
    okText: '确定',
    container: _getAlertContainer(),
  }, options);
  return _showAlert({
    data,
    config
  });
};

Alert.error = function error(msg, fn) {
  const { data, options } = _transParam(msg, fn);
  const config = Object.assign({}, {
    type: 'error',
    iconType: 'cross-circle-o',
    okText: '确定',
    container: _getAlertContainer(),
  }, options);
  return _showAlert({
    data,
    config
  });
};

Alert.warning = function warning(msg, fn) {
  const { data, options } = _transParam(msg, fn);
  const config = Object.assign({}, {
    type: 'warning',
    iconType: 'exclamation-circle-o',
    okText: '确定',
    container: _getAlertContainer(),
  }, options);
  return _showAlert({
    data,
    config
  });
};

Alert.confirm = (msg, fn) => {
  const { data, options } = _transParam(msg, fn);
  const config = Object.assign({}, {
    type: 'confirm',
    okText: '确定',
    cancelText: '取消',
    container: _getAlertContainer(),
  }, options);
  return _showAlert({
    data,
    config
  });
};

export default Alert;
