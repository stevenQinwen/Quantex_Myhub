import React from 'react';
import { Radio } from 'antd';
import classNames from 'classnames';
import _ from "lodash";
import API from 'utils/API';
import Util from 'utils/util';

import style from './index.scss';

class RadioComponent extends React.Component {
  state = {
    disabled: false, // 是否全部禁用
    value: undefined, // 当前选中
    options: [] // options 配置 [{name, id}...]
  };

  get value() { return this.isControll() ? this.props.value : this.state.value; }

  /**
   * 是否可控
   */
  isControll = () => {
    return this.props.value !== null && this.props.value !== undefined;
  };

  /**
   * 判断 option 是否被禁用
   * @param {object} option option
   * @return {bool} 是否可用
   */
  isOptionDisabled = (option) => {
    return this.state.disabled ||
      (typeof this.props.disabled == "function" ? this.props.disabled(option) : false) ||
      this.props.disabled === true ||
      option.disabled;
  };

  /**
   * 寻找option中为disabled的项
   * 并判断其是否已被禁用并选中
   * 此时所有radio都会被禁用
   * @param {array} options options
   * @return {any} 被选中的值
   */
  makeEnable = (options = this.state.options) => {
    let value;
    options.forEach((va) => {
      if (va.disabled ||
        (typeof this.props.disabled == "function" ? this.props.disabled(va) : false) ||
        this.props.disabled === true) {
        value = va.id;
      }
    });
    return value;
  };

  /**
   * antd onChange 回调函数
   * 整理当前选中的参数并触发 props onChange 回调函数
   * @param {event} e 点击事件
   */
  onChange = (e) => {
    const { value } = e.target;
    const propValue = (this.isControll() ? this.props.value : this.state.value) == value ? '' : value;
    if (this.props.onChange) this.props.onChange(propValue);
    if (!this.isControll()) this.setState({ value: propValue });
  };

  /**
   * 整理 options enable disabled 属性
   * 此函数用于初始化 一般在 constructor 或 componentWillReceiveProps 中运行
   * 此函数对 state 中的属性进行直接赋值 故不可在其他处运行
   * @param {object} props 要整理的 props
   */
  makeOptions = (props) => {
    if (props.dictUrl) {
      // 请求远程参数
      new API(props.dictSite).get(props.dictUrl, { dictKey: props.dictKey, query: props.dictParams }).then((res) => {
        if (res.code == 200) {
          let options = res.data.list.concat((props.options || []));
          let state = { options: options };
          let enable = this.makeEnable(options);
          if (enable !== null && enable !== undefined && enable !== '' && this.props.disabled !== true) {
            state.disabled = this.value == enable;
          }
          this.setState(state);
        }
      });
    } else {
      this.state.options = props.options;
      let enable = this.makeEnable();
      if (enable !== null && enable !== undefined && enable !== '' && props.disabled !== true) {
        this.state.disabled = this.value == enable;
      }
    }
  };

  constructor(props) {
    super(props);
    this.state.value = this.props.defaultValue;
    if (this.props.disabled === true) this.state.disabled = true;
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
      nextProps.disabled != this.props.disabled ||
      !_.isEqual(nextProps.dictParams, this.props.dictParams)) {
      this.makeOptions(nextProps);
    }
  }

  render() {
    const vertical = this.props.vertical === true;
    const value = this.value;
    return <div
      className={style.root + (this.props.className ? ' ' + this.props.className : '')}
      style={this.props.style}
    >
      {
        this.state.options.map((option, i) => {
          const disabled = this.isOptionDisabled(option);
          const checked = value == option.id;
          const classname = classNames({
            checked: checked,
            vertical: vertical
          });
          return <Radio
            className={classname}
            key={i}
            value={option.id}
            checked={checked}
            onChange={this.onChange}
            disabled={disabled}
          >{option.name}</Radio>;
        })
      }
    </div>;
  }
}

RadioComponent.defaultProps = {
  dictSite: 'auth'
};

RadioComponent.propTypes = {
  options: React.PropTypes.array, // 选项
  dictSite: React.PropTypes.string, // dictSite
  dictUrl: React.PropTypes.string, // 字典地址
  dictKey: React.PropTypes.string, // 字典key
  dictParams: React.PropTypes.object, // 字典参数
  onChange: React.PropTypes.func, // onChange 回调函数
  disabled: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.bool]), // 禁用选项函数 return true 时指定选项会被禁用
  vertical: React.PropTypes.bool // 垂直排列 不传时默认水平排列
};

export default RadioComponent;
