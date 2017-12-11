import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Menu } from 'antd';
import Tooltip from 'rc-tooltip';

const styles = require('./index.scss');

const TabPane = Tabs.TabPane;

class TabListComponent extends React.Component {
  componentDidMount() {
    this.getContainer();
  }
  onChange = (key) => {
    this.props.onSwitch(key);
  };
  onClose = (key) => {
    this.props.onClose(key);
  };
  onRightClick = (event, tab) => {
    event.preventDefault();
    event.stopPropagation();
    this.renderCm(event, tab);
  };
  onDoubleClick = (event, tab) => {
    this.props.onReload(tab);
  };
  onMenuItemClick = (node) => {
    const { data } = node.item.props;
    const { key } = node;
    switch (key) {
      case 'new':
        // 新窗口打开
        window.openWindow({
          url: `/page/${data.link}`,
          title: data.title,
        });
        break;
      case 'reload':
        // 重新加载
        this.props.onReload(data);
        break;
      case 'close-other':
        // 关闭其它
        this.props.onCloseOther(data);
        break;
      case 'close-all':
        // 关闭所有
        this.props.onCloseAll();
        break;
      default:
      // 无操作
    }
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      this.toolTip = null;
    }, 0);
  };
  getContainer = () => {
    if (!this.cmContainer) {
      this.cmContainer = document.createElement('div');
      document.body.appendChild(this.cmContainer);
    }
    return this.cmContainer;
  };
  renderCm = (event, tab) => {
    if (this.toolTip) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      this.toolTip = null;
    }
    this.contextMenu = (
      <Menu onClick={this.onMenuItemClick}>
        <Menu.Item key="new" data={tab}>
          新窗口打开
        </Menu.Item>
        <Menu.Item key="reload" data={tab}>
          重新加载
        </Menu.Item>
        <Menu.Item key="close-other" data={tab}>
          关闭其它
        </Menu.Item>
        <Menu.Item key="close-all" data={tab}>
          关闭所有
        </Menu.Item>
      </Menu>
    );
    this.toolTip = (
      <Tooltip trigger="click"
        placement="bottomLeft"
        prefixCls="tab-contextmenu"
        defaultVisible
        overlay={this.contextMenu}>
        <span></span>
      </Tooltip>
    );

    const container = this.getContainer();
    Object.assign(this.cmContainer.style, {
      position: 'absolute',
      left: `${event.pageX}px`,
      top: `${event.pageY}px`,
      "z-index": 10
    });

    ReactDOM.render(this.toolTip, container);
  };
  render() {
    const { curSelectedPage, tabList } = this.props;
    return (
      <div className={styles['layout-tab-list']}>
        <Tabs hideAdd
          onChange={this.onChange}
          activeKey={curSelectedPage}
          type="editable-card"
          onEdit={this.onClose}>
          {tabList.map((tab) => {
            const title = (
              <span className="layout-tab-item-span m-r-6" onContextMenu={(event) => { this.onRightClick(event, tab); }}
                onDoubleClick={(event) => { this.onDoubleClick(event, tab); }}>
                {tab.title}
              </span>
            );
            return <TabPane tab={title} key={tab.link}></TabPane>;
          })}
        </Tabs>
      </div>
    );
  }
}

TabListComponent.defaultProps = {
};

export default TabListComponent;
