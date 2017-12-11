import React, { Component } from 'react';
import API from 'utils/API';

// 下载组件
class DownloadComponent extends Component {
  constructor(props) {
    super(props);
    this.api = new API(props.downloadSite);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    function saveBlob(blob, fileName) {
      let a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
    }

    const { action, downloadParams } = this.props;
    const url = this.api._makeURL(action, downloadParams, 'GET').url;
    const headers = this.api._handleHeader();
    // @see https://github.com/react-component/upload/blob/e960a3fc2b6c2a6d1897ab3c89b1fce72e259ed5/src/request.js
    // @see https://segmentfault.com/a/1190000004322487
    // @see https://stackoverflow.com/questions/22724070/prompt-file-download-with-xmlhttprequest

    const xhr = new XMLHttpRequest();
    // 设置 xhr 请求的超时时间
    xhr.timeout = 3000;
    // 创建一个 get 请求, 采用异步
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    // 注册相关事件回调处理函数
    // 当请求成功完成时触发
    xhr.onload = function onload() {
      // logger.log('this.status:', this.status);
      let blob = xhr.response;
      let fileName = xhr.getResponseHeader("Content-Disposition").match(/\sfilename="([^"]+)"(\s|$)/)[1];
      saveBlob(blob, fileName);
    };
    xhr.ontimeout = function ontimeout(e) {
      logger.error(e);
    };
    xhr.onerror = function onerror(e) {
      logger.log(e);
    };

    // 设置 headers
    for (let h in headers) {
      xhr.setRequestHeader(h, headers[h]);
    }
    // 发送
    xhr.send();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ display: 'inline' }}>
        { this.props.children }
      </form>
    );
  }
}

DownloadComponent.propTypes = {
  action: React.PropTypes.string.isRequired,
  downloadSite: React.PropTypes.string.isRequired,
  downloadParams: React.PropTypes.object
};
DownloadComponent.defaultProps = {
  downloadParams: {}
};
export default DownloadComponent;
