import React from 'react';
import _ from 'lodash';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "./modules";

const styles = require('./index.scss');

class ContextMenuComponent extends React.Component {
  handleClick = (e, data, target, fn) => {
    fn(data.data[this.targetIndex], {
      action: data.action
    });
  }
  handleRightClick = (e) => {
    e.stopPropagation();
    // 如果是list数据通过以下代码可以找到index
    const target = e.target;
    const childrenList = Array.from(target.parentElement.children);
    const index = childrenList.indexOf(target);
    if (index > -1) {
      this.targetIndex = index;
    } else {
      throw new Error('Cannot find the index of click item');
    }
  }
  render() {
    const uniqueId = _.uniqueId();
    const { children, data, config } = this.props;
    const { items, onItemClick } = config;
    return (
      <div className={styles.root} onContextMenu={this.handleRightClick}>
        <ContextMenuTrigger id={`context-menu-${uniqueId}`}>
          {children}
        </ContextMenuTrigger>
        <ContextMenu id={`context-menu-${uniqueId}`}>
          {items.map((item) => {
            return (
              <MenuItem key={item.action}
                        onClick={(e, menuData, target) => { this.handleClick(e, menuData, target, onItemClick); }}
                        data={{ action: item.action, data }}>
                {item.name}
              </MenuItem>
            );
          })}
        </ContextMenu>
      </div>
    );
  }
}

ContextMenuComponent.propTypes = {
  config: React.PropTypes.object.isRequired
};
ContextMenuComponent.defaultProps = {
  // config: {
  //   onRightClick: (e) => { // findIndex },
  //   onItemClick: (item, extend) => { logger.log(extend.action, item); },
  //     items: [{
  //   action: 'add',
  //   name: '添加'
  // }, {
  //   action: 'edit',
  //   name: '编辑'
  // }]
  // }
};

export default ContextMenuComponent;
