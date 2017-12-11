import React from 'react';
import { Cascader } from 'antd';
import _ from 'lodash';
import API from 'utils/API';
import Util from 'utils/util';

const styles = require('./index.scss');

class CascaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.api = new API(props.treeSite);
    this.state = {
      treeData: props.treeData
    };
  }

  componentDidMount() {
    this.initTreeData(this.props);
    // 添加一个初始化数值的trigger
    // 使用场景：比如「风控管理-基础数据-证券池设置-编辑动态证券池表单」，初进表单时，多行表单，Input1有值，Input3要依赖Input1的onChange事件来获取它的类型和取选项方式
    //          即：使初始化已有值时，触发原来onChange的事件
    this.props.onInit();
  }

  /**
   * 判断 props 的更改是否达到了更新组件的条件
   * props 的更新操作不直接造成组件的更新, 而是通过 iniTreeData 中去触发 setState 方法重新渲染组件
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.shouldUpdateWhenMainPropsChange(nextProps)) {
      this.updateWhenMainPropsChange = true;
      this.initTreeData(nextProps);
    } else {
      this.updateWhenMainPropsChange = false;
    }
  }

  /**
   * 如果是 state 的改变引起的更新操作, 则一定会重新渲染组件
   * 如果是 props 的改变造成的更新则不进行重新的 render
   * 因为 componentWillReceiveProps 里已经进行了 setState 操作
   * props 的变化引起的更新行为最终会体现为 state 的更新操作
   * 所以这里只允许 state 的变化引起组件的重新渲染
   * @param nextProps
   * @param nextState
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.shouldUpdateWhenStateChange(nextState)
      || !this.updateWhenMainPropsChange;
  }

  /**
   * 以下属性有变化即视为 props 的更改会造成组件重新渲染
   * @param nextProps
   * @returns {*|boolean}
   */
  shouldUpdateWhenMainPropsChange = (nextProps) => {
    const { treeData, treeUrl, treeParams } = this.props;
    return (
      !Util.isArrayEqual(treeData, nextProps.treeData)
      || !_.isEqual(treeParams, nextProps.treeParams)
      || treeUrl !== nextProps.treeUrl
    );
  }

  /**
   * 判断是 state 的变化是否会影响组件重新渲染
   * @param nextState
   * @returns {boolean}
   */
  shouldUpdateWhenStateChange = (nextState) => {
    const { treeData } = this.state;
    return !Util.isArrayEqual(treeData, nextState.treeData);
  }

  /**
   * 初始化获取数据
   * @param props
     */
  initTreeData = (props) => {
    const { treeData, treeUrl } = props;
    if (treeData.length) {
      this.setTreeData(treeData);
    } else if (treeUrl) {
      const params = this.getUrlParams(props);
      this.api.get(treeUrl, params).then((res) => {
        if (res.code == 200) {
          this.setTreeData(res.data.list);
        }
      });
    }
  }

  setTreeData = (treeData = []) => {
    this.setState({
      treeData
    });
  }

  getUrlParams = (props) => {
    return {
      query: Util.buildFilterParams(props.treeParams)
    };
  }

  onChange = (value, selectedOptions) => {
    console.log('onChange', value, selectedOptions);
    this.props.onChange(value, selectedOptions);
  }

  /**
   * 转换成树结构数据
   * 根据条件将 disabled 属性值插入到每个节点
   */
  handleTreeData = () => {
    const config = {
      extProp: {
        value: (item) => {
          return item.id;
        },
        label: (item) => {
          return item.name;
        },
        children: (item) => {
          return item.items;
        },
        disabled: (item) => {
          return item.data.disabled;
        }
      }
    };
    let { treeData } = this.state;
    let { disabledValues } = this.props;
    disabledValues = Util.valuesToStrings(disabledValues);

    treeData = treeData.map((item) => {
      if (disabledValues.includes(`${item.id}`)) {
        item.disabled = true;
      }
      return item;
    });

    return Util.toTreeData(treeData, config);
  }

  render() {
    const { treeData } = this.state;
    let { defaultValue, value } = this.props;
    const options = this.handleTreeData();

    defaultValue = Util.valuesToStrings(defaultValue);
    value = Util.valuesToStrings(value);

    const props = {
      className: `${styles.root}`,
      options,
      onChange: this.onChange,
      onInit: this.onInit
    };

    // 当 this.props.value 不为空时才能传入 defaultValue/value 这个字段到 Cascader 组件
    !_.isUndefined(defaultValue) && (props.defaultValue = defaultValue);
    !_.isUndefined(value) && (props.value = value);

    return (
      treeData.length ? <Cascader {...this.props} {...props}/> : <Cascader key="empty-cascader" {...this.props}/>
    );
  }
}

CascaderComponent.propTypes = {
  treeData: React.PropTypes.array,
  treeUrl: React.PropTypes.string,
  treeParams: React.PropTypes.object,
  treeSite: React.PropTypes.string,
  disabledValues: React.PropTypes.array,
  onInit: React.PropTypes.func,                         // 设置初始值时（edit表单），触发事件 - 函数类型
};
CascaderComponent.defaultProps = {
  // ==========================
  // Custom props
  // ==========================
  treeData: [],
  treeParams: {}, // 指定数据过滤参数
  treeSite: 'auth', // 将从指定site获取数据
  disabledValues: [], // 禁用(不隐藏)树节点列表, id 列表
  onInit: () => {},                                     // 设置初始值时（edit表单），触发事件

  // ==========================
  // Ant props
  // ==========================
  showSearch: true,
  size: 'small',
  notFoundContent: '暂无数据',
  placeholder: '请选择',
  onChange: () => {},
};

export default CascaderComponent;
