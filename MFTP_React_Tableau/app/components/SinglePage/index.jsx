/**
 * Created by harry on 2017/3/16.
 */
import React from 'react';
import DevTools from 'mobx-react-devtools';
import ApiConfig from 'config/api';
import msgCenter from 'utils/MsgCenter';
import WebSocket from 'utils/WebSocket';

const styles = require('./index.scss');

class SinglePageComponent extends React.Component {

  componentDidMount() {
    this.initWS(); // 初始化浏览器 websocket
  }

  componentWillUnmount() {
    this.ws && this.ws.close();
  }

  initWS = () => {
    this.ws = new WebSocket('msgcenter', '/event/endpoint');
    this.ws.onmessage = (resultObj) => {
      logger.info(`msgCenter publish: 【 msgType:`, resultObj.data.msgType, '】', resultObj);
      msgCenter.publish(resultObj.data.msgType, resultObj.data); // 发布消息
    };
  };

  render() {
    return (
      <div className={`qx-page-container ${styles['single-page']} page-container-visible`}>
        <section>
          { ApiConfig.isDebug ? <DevTools /> : null }
        </section>
        {this.props.children}
      </div>
    );
  }
}

export default SinglePageComponent;
