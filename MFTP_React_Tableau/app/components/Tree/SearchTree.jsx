import React from 'react';
import { Input, Popconfirm, Tree, Menu, Dropdown } from 'antd';
import MobX from "mobx-react";
import _ from 'lodash';
import Util from 'utils/util';

const TreeNode = Tree.TreeNode;

class SearchTreeComponent extends React.Component {
  state = {
    inputValue: ''
  };
  /**
   * 模糊搜索框变化时触发
   * @param event
   */
  handleChange = (event) => {
    // 一旦输入框有变化,则将模糊查找的字段设为有效
    const value = event.target.value;
    if (value) {
      this.filterKeys = [];
    } else {
      this.filterKeys = undefined;
    }
    this.setState({
      inputValue: value,
    });
  }
  /**
   * 点击右键菜单节点操作按钮触发
   */
  handleItemClick = (info) => {
    logger.log('info:', info);
    const { key } = info;
    const { data } = info.item.props;
    if (key === 'add') {
      logger.log('添加节点', data);
      // 执行外围添加函数
      this.props.onAddNode(data);
    } else if (key === 'mod') {
      logger.log('编辑节点', data);
      // 执行外围编辑函数
      this.props.onModNode(data);
    } else {
      // 非指定事件类型时统一触发事件
      logger.log(key, data);
      this.props.onContextMenuClick(key, data);
    }
  }
  onDelNode = (data) => {
    logger.log('删除节点:', data);
    this.props.onDelNode(data);
  }
  /**
   * 传递给rc-tree的选中节点回调方法
   * @param selectedKeys
   * @param info
   */
  onSelect = (selectedKeys, info) => {
    logger.log('selected:', selectedKeys, info);
    // 执行外围函数
    this.props.onSelect(info.node.props.data, selectedKeys);
  }
  /**
   * 传递给rc-tree的折叠节点时回调方法
   * @param expandedKeys
   */
  onExpand = (expandedKeys) => {
    logger.log('onExpand', expandedKeys);
    // 执行外围函数
    this.props.onExpand(expandedKeys);
    // 手动操作过标签后则将模糊查找使用的字段设为无效
    this.filterKeys = undefined;
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded chilren keys.
    // 手动折叠标签时,将自动打开父标签属性设为否,否则会造成父标签无法折叠的bug
    this.setState({
      expandedKeys: expandedKeys
    });
  }
  onRightClick = (info) => {
    const { rightable } = this.props;
    if (!rightable) return;
    window.getSelection().removeAllRanges();
    logger.log('right click', info);
    this.refs['dd-' + info.node.props.data.id].click();
  }
  /**
   * 拖拽树节点
   * @param info
   */
  onDrop = (info) => {
    logger.log('drop', info);
    const { node, dragNode, dropToGap, dropPosition } = info;
    const targetNodeData = node.props.data;   // 目标节点
    const dragNodeData = dragNode.props.data; // 操作节点
    let dropType = '';
    if (dropToGap) {
      if (dropPosition <= 0) {
        dropType = 'prev';
      } else {
        dropType = 'next';
      }
    } else {
      dropType = 'inner';
    }
    logger.log('dragNodeData', dragNodeData);
    logger.log('targetNodeData', targetNodeData);
    logger.log('dropType', dropType);
    this.props.onDrop(dragNodeData, targetNodeData, dropType);
  }
  /**
   * 传入此方法供rc-tree过滤节点达到筛选的效果
   * @param treeNode
   */
  filterTreeNode = (treeNode) => {
    // 指定 searchKey 作为模糊搜索过滤字段
    return this.filterFn(treeNode.props.searchKey);
  }
  filterFn = (key) => {
    // 将拼凑的id字段移除
    return this.state.inputValue && key.includes(this.state.inputValue);
  }
  renderTreeNode = (config) => {
    const { addDiyClass, addDiyDom } = this.props.treeNodeConfig;
    const { treeData } = config;
    return treeData.map((item) => {
      const key = `${item.id}`; // 对key的操作均为字符串类型,应转成字符串
      const name = item.name; // 指定 name 作为模糊搜索过滤字段
      const itemData = item.data;
      const contextMenuKeys = itemData.contextMenuKeys || ["mod", "add", "del"];
      const contextMenuMap = new Map([
        ["mod", <Menu.Item key="mod" data={itemData}>编辑</Menu.Item>],
        ["add", <Menu.Item key="add" data={itemData}>添加</Menu.Item>],
        ["del", (
          <Menu.Item key="del" data={itemData}>
            <Popconfirm
              placement="topLeft"
              title="是否删除该节点?"
              onConfirm={() => { this.onDelNode(itemData); }}
              okText="是"
              cancelText="否"
            >
              删除
            </Popconfirm>
          </Menu.Item>
        )]
      ]);
      // 定义每个节点的下拉菜单
      const menu = (
        <Menu className="treenode-context-menu" onClick={this.handleItemClick}>
          {contextMenuKeys.map((iconKey) => {
            return typeof iconKey === "object" ? // { action, name }
              <Menu.Item key={iconKey.action} data={itemData}>{iconKey.name}</Menu.Item> : // 自定义 MenuItem
              contextMenuMap.get(iconKey); // 生成指定 MenuItem
          })}
        </Menu>
      );
      // 通过Dropdown组件包装使hover时自动下拉
      const title = (
        <span>
          <span className="title">{name}</span>
          {(_.isFunction(addDiyDom) && addDiyDom(itemData)) || null}
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <span ref={`dd-${key}`}></span>
          </Dropdown>
        </span>
      );


      // 如果处于模糊查找的状态下,则与输入内容进行匹配,生成匹配的节点名称(key)数组
      if (this.filterKeys && this.filterFn(name)) {
        this.filterKeys.push(key);
      }

      const treeNodeProps = {
        key: key,
        searchKey: name,
        title: title,
        data: itemData,
        disabled: itemData.disabled,
        disableCheckbox: itemData.disableCheckbox,
        className: (_.isFunction(addDiyClass) && addDiyClass(itemData)) || ''
      };
      if (item.items) {
        return (
          <TreeNode {...treeNodeProps}>
            {this.renderTreeNode(_.assign({}, config, {
              treeData: item.items
            }))}
          </TreeNode>
        );
      }
      return <TreeNode {...treeNodeProps} />;
    });
  };
  render() {
    // render TreeNode
    // 简化变量名
    let { treeData, showSearch } = this.props;
    // 过滤掉隐藏的节点
    treeData = treeData.filter((item) => {
      return !item.hidden;
    });
    treeData = Util.toTreeData(treeData);

    const props = {
      onExpand: this.onExpand,
      onSelect: this.onSelect,
      onRightClick: this.onRightClick, // 如果 props 中设置了 rightable 为 true 时则传入右键事件, 默认不传入
      filterTreeNode: this.filterTreeNode,
      onDrop: this.onDrop
    };

    // 如果有模糊查找的操作,则将 expandedKeys 设置为过滤出来的 key 数组,并将自动打开父标签设为 true
    if (this.filterKeys) {
      props.expandedKeys = this.filterKeys;
    }

    return (
      <div className={`tree-content ${!showSearch ? 'tree-content-without-search' : ''}`}>
        {showSearch && <Input placeholder="搜索节点" onChange={this.handleChange} size="small" />}
        <Tree {...this.props} {...props}>
          {this.renderTreeNode({
            treeData
          })}
        </Tree>
      </div>
    );
  }
}

SearchTreeComponent.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ]),
  treeData: React.PropTypes.oneOfType([
    React.PropTypes.array,
    MobX.PropTypes.observableArray
  ]).isRequired,
  showSearch: React.PropTypes.bool,
  rightable: React.PropTypes.bool,
  onAddNode: React.PropTypes.func,
  onModNode: React.PropTypes.func,
  onDelNode: React.PropTypes.func,
  onRightClick: React.PropTypes.func,
  onItemClick: React.PropTypes.func,
  treeNodeConfig: React.PropTypes.object,
};

SearchTreeComponent.defaultProps = {
  // ================== Custom-Tree-props ==================
  showSearch: true,
  rightable: false, // 是否开启右键点击事件
  onAddNode: () => { },
  onModNode: () => { },
  onDelNode: () => { },
  // ================ Custom-TreeNode-props ================
  // 以下属性均要加到每个节点数据中,而不是直接加在Tree组件的props中
  treeNodeConfig: { // 给每个树节点扩展自定义配置
    addDiyClass: () => { }, // 给每个节点添加自定义样式类, 要求函数返回值为 string
    addDiyDom: () => { }, // 给每个节点追加自定义内容, 要求函数返回值为 ReactNode
  },
  // =================== Ant-Tree-props ====================
  // 蚂蚁提供的配置项
  treeData: [],
  showLine: true, // 默认显示连线
  onSelect: () => { },
  onExpand: () => { },
  onDrop: () => { },
  onContextMenuClick: () => { } // 右键菜单时间
};

export default SearchTreeComponent;
