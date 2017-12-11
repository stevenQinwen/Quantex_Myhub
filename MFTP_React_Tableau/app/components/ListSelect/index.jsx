import React from 'react';
import { Input, Icon } from 'antd';
import MobX from "mobx-react";
import _ from 'lodash';
import ContextMenu from 'components/ContextMenu';
import Util from 'utils/util';
import API from 'utils/API';

const styles = require('./index.scss');

const Search = Input.Search;

class ListSelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.api = new API(props.listSite);
  }
  state = {
    listData: [],
    selectedItem: {}
  }
  componentDidMount() {
    this.initListData(this.props);
  }
  /**
   * 判断 props 的更改是否达到了更新组件的条件
   * props 的更新操作不直接造成组件的更新, 而是通过 iniTreeData 中去触发 setState 方法重新渲染组件
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.forceUpdateList
      || this.shouldUpdateWhenMainPropsChange(nextProps)) {
      this.updateWhenMainPropsChange = true;
      this.initListData(nextProps);
    } else {
      this.updateWhenMainPropsChange = false;
    }
  }
  /**
   * 如果是 props 的改变造成的更新则不进行重新的 render
   * 因为 componentWillReceiveProps 里已经进行了 setState 操作
   * 如果 forceUpdateTree 属性为 true 则会强制重新渲染组件
   * @param nextProps
   * @param nextState
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.shouldUpdateWhenStateChange(nextState) || !this.updateWhenMainPropsChange;
  }
  /**
   * 以下属性有变化即视为 props 的更改会造成组件重新渲染
   * @param nextProps
   * @returns {*|boolean}
   */
  shouldUpdateWhenMainPropsChange = (nextProps) => {
    const { listData, listUrl, listParams } = this.props;
    return (
      !Util.isArrayEqual(listData, nextProps.listData)
      || !_.isEqual(listParams, nextProps.listParams)
      || listUrl !== nextProps.listUrl
    );
  }
  /**
   * 判断是 state 的变化是否会影响组件重新渲染
   * @param nextState
   * @returns {boolean}
   */
  shouldUpdateWhenStateChange = (nextState) => {
    const { listData, selectedItem } = this.state;
    return !Util.isArrayEqual(listData, nextState.listData)
      || !_.isEqual(selectedItem, nextState.selectedItem);
  }
  initListData = (props) => {
    const { listData, listUrl } = props;
    if (listData.length) {
      this.listData = listData; // 保存原始数据
      this.setListData(listData);
    } else if (listUrl) {
      const params = this.getUrlParams(props);
      this.api.get(listUrl, params).then((res) => {
        if (res.code == 200) {
          this.listData = res.data.list; // 保存原始数据
          this.setListData(res.data.list);
        }
      });
    }
  }
  setListData = (listData = []) => {
    this.setState({
      listData
    });
  }
  getUrlParams = (props) => {
    return {
      dictKey: props.listKey,
      query: Util.buildFilterParams(props.listParams)
    };
  }
  handleSelect = (item) => {
    logger.log('selectedItem:', item);
    this.setState({
      selectedItem: item
    });
    this.props.onSelect(item);
  }
  handleInputChange = (e) => {
    const inputValue = e.target.value;
    this.setState({
      listData: this.filterData(inputValue)
    });
  }
  /**
   * 根据 input 框的值快速筛选出匹配的数组渲染到页面上
   * @param inputValue
   * @returns {*} 过滤后的数组
     */
  filterData = (inputValue) => {
    if (inputValue) {
      return this.listData.filter((item) => {
        return item.name && item.name.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
      });
    } else {
      return this.listData;
    }
  }

  /**
   * 刷新列表数据
   */
  handleRefresh = () => {
    const { listData, onRefresh } = this.props;
    // 如果 listData 由外部组件传入,则调用外部传入的刷新函数进行刷新
    if (listData.length) {
      onRefresh();
    } else {
      this.initListData(this.props);
    }
  }

  render() {
    const { listData, selectedItem } = this.state;
    const { contextMenuConfig, title, children } = this.props;
    const items = listData.map((item) => {
      return (
        <dt key={item.id}
            className={item.id === selectedItem.id ? 'list-select-item-selected' : ''}
            onClick={() => { this.handleSelect(item); }}>
          {item.name || '--'}
        </dt>
      );
    });
    const props = {
      className: `${styles.root} ${this.props.className || ''}`
    };
    const contextMenuProps = {
      data: listData,
      config: contextMenuConfig
    };
    return (
      <div {...props}>
        <div className={styles.titleBox}>
          {title && (
            <div className={`${styles.title} ${typeof title === 'string' ? '' : styles.link}`}>
              {title}
            </div>
          )}
          {children}
        </div>
        <Search placeholder="搜索列表" onChange={this.handleInputChange} size="small" className={styles.searchBtn}/>
        <div className={styles.content}>
          {
            listData.length ? (
              !_.isUndefined(contextMenuConfig) ? (
                <ContextMenu {...contextMenuProps}>
                  {items}
                </ContextMenu>
              ) : items
            ) : (
              <dt className="placeholder"><Icon type="frown-o"/>暂无数据</dt>
            )
          }
        </div>
      </div>
    );
  }
}

ListSelectComponent.propTypes = {
  listData: React.PropTypes.oneOfType([
    React.PropTypes.array,
    MobX.PropTypes.observableArray
  ]),
  listUrl: React.PropTypes.string,
  listKey: React.PropTypes.string,
  listParams: React.PropTypes.object,
  listSite: React.PropTypes.string,
  forceUpdateList: React.PropTypes.bool,
  onSelect: React.PropTypes.func,
  contextMenuConfig: React.PropTypes.object
};
ListSelectComponent.defaultProps = {
  listData: [],
  listParams: {},
  listSite: 'auth',
  onSelect: () => {},
};

export default ListSelectComponent;
