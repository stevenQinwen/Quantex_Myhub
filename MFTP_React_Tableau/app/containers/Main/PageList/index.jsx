import React from 'react';
import Page from './Page';

const styles = require('./index.scss');

class PageListComponent extends React.Component {
  render() {
    const { pageList, curSelectedPage } = this.props;
    // 保存当前页
    sessionStorage.setItem('curPageUrl', curSelectedPage || '');
    return (
      <div className={styles['layout-page']}>
        {pageList.map((item) => {
          const isShow = (item.link === curSelectedPage);
          return (
            <div id={item.link} className={`qx-page-container ${isShow ? 'page-container-visible' : 'hidden'}`} key={`${item.link}${item.suffixKey || ''}`}>
              <Page ref={`page/${item.link}`} name={item.name} url={item.link} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default PageListComponent;
