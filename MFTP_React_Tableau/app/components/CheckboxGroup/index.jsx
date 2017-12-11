import React from 'react';
import { Checkbox } from 'antd';
import _ from "lodash";
import API from 'utils/API';
import Util from 'utils/util';

import style from './index.scss';

const CheckboxGroup = Checkbox.Group;

/**
 * Checkbox Component
 */
class CheckboxGroupComponent extends React.Component {
  all = []; // 全部值
  enable = []; // 全部可用值
  state = {
    disabled: false,
    value: [], // 当前选中
    options: [] // options 配置 [{name, id}...]
  };

  get value() { return (this.isControll() ? this.props.value : this.state.value) || []; }

  /**
   * 是否可控
   */
  isControll = () => {
    return this.props.value !== null && this.props.value !== undefined;
  };

  /**
   * 当前是否全选中
   */
  isCheckedAll = () => {
    const value = this.value;
    const count = this.enable.filter((va) => { return value.indexOf(va) > -1; }).length;
    return count > 0 && count == this.enable.length;
  };

  /**
   * 当前是否半选
   */
  isIndeterminate = () => {
    const value = this.value;
    const count = this.enable.filter((va) => { return value.indexOf(va) > -1; }).length;
    return count > 0 && count < this.enable.length;
  };

  /**
   * 判断 option 是否为禁用
   * @param {object} option option
   * @return {bool} 是否可用
   */
  isOptionDisabled = (option) => {
    return this.props.disabled === true || (this.props.disabled ? this.props.disabled(option) : false) || option.disabled;
  };

  isOptionFiltered = (option) => {
    return this.props.preHandleDictData ? this.props.preHandleDictData(option) : true;
  };

  /**
   * 整理 options 中的可用配置
   * @param {object} options options
   * @return {array} 可用配置
   */
  makeEnable = (options = this.state.options) => {
    let arr = options.filter((option) => { return !this.isOptionDisabled(option); }).map((option) => { return option.id; });
    return arr;
  };

  /**
   * antd Checkbox onChange 回调函数
   * 整理当前选中的参数并触发 props onChange 回调函数
   * @param {event} e 点击事件
   */
  onChange = (e) => {
    const { value, checked } = e.target;
    let propValue = Object.assign([], this.value);
    if (checked) propValue.push(value);
    else {
      const index = propValue.indexOf(value);
      propValue.splice(index, 1);
    }
    this.callback(propValue);
  };

  /**
   * 全选事件
   * @param {event} e 点击事件
   */
  selectAll = (e) => {
    const { checked } = e.target;
    let propValue = Object.assign([], this.value);
    if (checked) {
      this.enable.forEach((va) => {
        if (propValue.indexOf(va) < 0) propValue.push(va);
      });
    } else {
      this.enable.forEach((va) => {
        const index = propValue.indexOf(va);
        if (index > -1) propValue.splice(index, 1);
      });
    }
    this.callback(propValue);
  }

  /**
   * 提交 props onChange 回调函数
   * @param {array} value 当前选中的值
   */
  callback = (value) => {
    if (this.props.onChange) this.props.onChange(value);
    if (!this.isControll()) this.setState({ value: value });
  };

  /**
   * 整理 options all enable disabled 属性
   * 此函数用于初始化 一般在 constructor 或 componentWillReceiveProps 中运行
   * 此函数对 state 中的属性进行直接赋值 故不可在其他处运行
   * @param {object} props 要整理的 props
   */
  makeOptions = (props) => {
    if (props.dictUrl) {
      // 请求远程参数
      new API(props.dictSite).get(props.dictUrl, { dictKey: props.dictKey, query: props.dictParams }).then((res) => {
        if (res.code == 200) {
          let options = res.data.list.concat(props.options || []);
          this.enable = this.makeEnable(options);
          this.setState({ options: options, disabled: this.enable.length < 1 }, () => {
            this.all = this.state.options.map((option) => { return option.id; });
          });
        }
      });
    } else {
      this.state.options = props.options;
      this.all = this.state.options.map((va) => { return va.id; });
      this.enable = this.makeEnable();
      this.disabled = this.enable.length < 1;
    }
  };

  constructor(props) {
    super(props);
    this.state.value = this.props.defaultValue || this.props.value;
    this.makeOptions(props);
  }

  /**
   * nextProps 与 this.props 关于 options 字段有所不同时
   * 重新整理 options all enable disabled 属性
   * @param {object} nextProps nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (!Util.isArrayEqual(nextProps.options, this.props.options) ||
      nextProps.dictUrl != this.props.dictUrl ||
      !_.isEqual(nextProps.dictParams, this.props.dictParams)) {
      this.makeOptions(nextProps);
    }
  }

  render() {
    const { vertical } = this.props;
    // 判断是否全选或半选
    const checkedAll = this.isCheckedAll();
    const indeterminate = this.isIndeterminate();
    const value = this.value;
    const options = this.state.options.filter((option) => {
      return this.isOptionFiltered(option);
    }).map((option) => {
      return {
        label: option.name,
        value: option.id,
        disabled: this.isOptionDisabled(option)
      };
    });
    return <div
      className={style.root + (this.props.className ? ' ' + this.props.className : '')}
      style={this.props.style}
    >
      {this.props.showCheckAll ? <Checkbox
        className={(checkedAll ? ' checked' : '')}
        onChange={this.selectAll}
        checked={checkedAll}
        indeterminate={indeterminate}
        disabled={this.state.disabled}
      >全选</Checkbox> : null}
      <CheckboxGroup className={vertical === true ? "vertical" : ""} value={value} options={options} onChange={this.callback} />
    </div>;
  }
}

CheckboxGroupComponent.defaultProps = {
  dictSite: 'auth',
  showCheckAll: false
};

CheckboxGroupComponent.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array
  ]),
  options: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array
  ]), // 选项
  dictSite: React.PropTypes.string, // dictSite
  dictUrl: React.PropTypes.string, // 字典地址
  dictKey: React.PropTypes.string, // 字典key
  dictParams: React.PropTypes.object, // 字典参数
  onChange: React.PropTypes.func, // onChange 回调函数
  disabled: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool
  ]), // 禁用选项函数 return true 时指定选项会被禁用
  preHandleDictData: React.PropTypes.func,
  showCheckAll: React.PropTypes.bool, // 是否显示全选按钮 默认 false
  vertical: React.PropTypes.bool // 垂直排列 不传时默认水平排列
};

export default CheckboxGroupComponent;
