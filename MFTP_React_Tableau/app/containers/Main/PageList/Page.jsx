/**
 * PageComponent 针对页面的统一控制处理,比如默认使所有子页面不进行更新操作
 */
import React from 'react';
import Spin from 'components/Spin';
import ApiConfig from 'config/api';
import pageContainers from 'containers/page/pagemap';

class PageComponent extends React.Component {
  render() {
    let url = this.props.url;
    let Content = null;
    if (url) {
      if (pageContainers.has(url)) {
        Content = pageContainers.get(url);
      } else {
        if (url.match(/\.(html|com)/)) {
          // 如果路径匹配到的是可直接访问链接,则返回 webview
          //  return <webview src={url} style={{ display: 'inline-flex', width: '100%', height: '100%' }}></webview>;
          // 对URL进行处理，FROMqaw/page/page/page.html?page=portfoliomanagement/portfolioflownew15/index/index.html
          let app = url.substring(0, url.indexOf('/'));
          if (app in ApiConfig.domain) {
            url = url.substr(app.length);
            url = ApiConfig.domain[app] + url;
            logger.debug(url);
          }
          return <iframe className='iframe' src={url}></iframe>;
        } else {
          // 如果所调用页面组件不存在,则默认展示404页面
          Content = pageContainers.get('error/Notfound');
        }
      }
    } else {
      // 如果所调用页面组件不存在,则默认展示404页面
      Content = pageContainers.get('error/Notfound');
    }
    return (
      <Content />
    );
  }

  shouldComponentUpdate() {
    // 默认不执行更新操作
    return false;
  }

  componentWillUnmount() {
    Spin.removeInstance(this.props.url);
  }
}

export default PageComponent;
