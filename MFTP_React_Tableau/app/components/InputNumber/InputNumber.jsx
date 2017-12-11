import React from 'react';
import { InputNumber } from 'antd';
import classNames from 'classnames';

const styles = require('./index.scss');

/**
 * FIXME: replace 会导致光标位于输入框末尾 可能需要控制输入框光标位置来消除此问题
 * antd inputNumber 同样有此问题
 */
class InputNumberComponent extends React.Component {
  precision; // 当前输入值的验证小数位数
  fixedPrecision; // scale 小于 1 时 修正果的需要验证的小数位数
  fixedStepPrecision; // step 小于 scale 时 点击上下按钮需要验证的小数位数

  constructor(props) {
    super(props);
    this.precision = 0;
    this.fixedPrecision = this.fixPrecision();
    this.fixedStepPrecision = this.fixStepPrecision();
  }

  /**
   * 修正实际值验证小数位数
   */
  fixPrecision = () => {
    if (this.props.fixPrecision) return this.props.fixPrecision(this.props.precision);
    // scale 小于 1 时 需要为指定小数位补充相应精度的小数位数
    const { scale, precision } = this.props;
    return precision + (scale < 1 ? Math.abs(Math.log10(scale)) : 0);
  };

  /**
   * 修正上下按钮验证小数位数
   */
  fixStepPrecision = () => {
    const { step, scale } = this.props;
    // step 小于 scale 时 需要为点击上下按钮补充相应精度的小数位数
    // step 与 scale 的关系决定了基本的小数验证位数 其关系应与 precision 保持一致
    return step && step < scale ? Math.log10(scale / step) : 0;
  };

  // 存在 min 或 max 配置项, 组件在不受控情况下, onChange 返回值不正常, 此时应使用 onBlur 取值
  onChange = (value) => {
    this.props.onChange(value);
  };

  onBlur = (e) => {
    logger.log('onBlur:', e.target.value, this.parser(e.target.value));
    this.props.onBlur(this.parser(e.target.value));
  };

  /**
   * 格式化显示
   * @param value
   * @return {*}
     */
  formatterValue = (value) => {
    // 转成字符串
    if (value === undefined || value === '') return value;
    value += '';
    // 添加千分位分隔符
    const { thousandSeparator } = this.props;
    if (thousandSeparator) {
      const vals = value.split('.');
      if (value.indexOf('.') > -1) {
        value = `${vals[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)}.${vals[1] !== undefined ? vals[1] : ''}`;
      } else {
        value = `${vals[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)}`;
      }
    }
    // 处理前缀
    if ('prefix' in this.props) {
      value = `${this.props.prefix} ${value}`;
    }
    // 处理后缀
    if ('suffix' in this.props) {
      value = `${value}${this.props.suffix}`;
    }
    // 执行回调
    if ('formatter' in this.props) {
      value = this.props.formatter(value);
    }
    return value;
  }

  /**
   * 转化为数字
   * @param value
   * @return {*}
     */
  parserValue = (value) => {
    if (value === undefined || value === '') return value;
    const { thousandSeparator } = this.props;
    // 去除千分位分隔符
    if (thousandSeparator) {
      const reg = new RegExp(`${thousandSeparator}`, 'g');
      value = value.replace(reg, '');
    }
    // 去除前缀
    if ('prefix' in this.props) {
      const reg = new RegExp(`\\${this.props.prefix}\\s?`, 'g');
      value = value.replace(reg, '');
    }
    // 去除后缀
    if ('suffix' in this.props) {
      const reg = new RegExp(`\\${this.props.suffix}\\s?`, 'g');
      value = value.replace(reg, '');
    }
    // 执行回调
    if ('parser' in this.props) {
      value = this.props.parser(value);
    }
    return value;
  }

  /**
   * 接收 parser 函数返回的真实值进行格式化显示到页面上
   * @param value
   * @returns {*}
   */
  formatter = (value) => {
    // 用户手动输入时，可以获取到预先保存的 this.inputValue
    if (this.inputValue !== undefined) {
      let inputValue = this.inputValue;
      const vals = this.inputValue.split('.');
      if (vals[1] !== undefined && vals[1].length > this.fixedPrecision) {
        inputValue = parseFloat(this.inputValue, 10).toFixed(this.fixedPrecision);
      }
      // 处理完一次用户输入后将保存的输入值清空
      this.inputValue = undefined;
      let _value = this.formatterValue(inputValue);
      return _value;
    }
    // 当前输入值不是数字时清空
    let vals = parseFloat(value, 10) / this.props.scale;
    if (isNaN(vals)) return '';
    // 是数字时整理精度
    let valStr = vals.toFixed(this.props.precision).toString().split('.');
    this.precision = valStr[1] ? valStr[1].replace(/[0]*$/, '').length : 0;
    this.precision = this.precision > this.props.precision ? this.props.precision : this.precision;
    return this.formatterValue(vals.toFixed(this.precision)); // 手动 toFixed 解决精度位的问题
  }

  /**
   * 将返回值/100, 下一步传到 onChange, 继而被 Form 收集值
   * @param value
   * @returns {string}
   */
  parser = (value) => {
    // 将输入的值保存到实例上，供 formatter 函数格式化使用（仅限用户手动输入的场景）
    const { precision } = this.props;
    const parserValue = this.parserValue(value);
    if (parserValue !== undefined) {
      const vals = parserValue.split('.');
      if (vals[1] !== undefined && vals[1].length > precision) {
        this.inputValue = parseFloat(parserValue, 10).toFixed(precision); // 保存显示值
      } else {
        this.inputValue = parserValue; // 保存显示值
      }
    }
    return this.inputValue ? (parseFloat(this.inputValue, 10) * this.props.scale).toFixed(this.fixedPrecision) : ''; // 手动 toFixed 解决精度位的问题
  }

  render() {
    const { className, addonBefore, addonAfter } = this.props;
    const rootClassName = classNames({
      [`${styles.root}`]: true,
      [`${className}`]: className
    });
    const inputNumberClassName = classNames({
      'input-addon-before': addonBefore,
      'input-addon-after': addonAfter
    });
    const props = {
      step: this.props.step || this.props.scale,
      className: inputNumberClassName,
      onBlur: this.onBlur,
      onChange: this.onChange,
      formatter: this.formatter,
      parser: this.parser,
      ref: this.props.innerRef,
      precision: this.fixedPrecision
    };
    return (
      <span className={rootClassName}>
        {addonBefore ? <span className='addon-elem addon-before'>{addonBefore}</span> : null}
        <InputNumber {...this.props} {...props} />
        {addonAfter ? <span className='addon-elem addon-after'>{addonAfter}</span> : null}
      </span>
    );
  }
}

InputNumberComponent.propTypes = {
  prefix: React.PropTypes.string,
  suffix: React.PropTypes.string,
  precision: React.PropTypes.number,
  scale: React.PropTypes.number, // 必须为 10 的倍数
  step: React.PropTypes.number, // 必须为 10 的倍数 step 与 scale 的关系决定了基本的小数验证位数 其关系应与 precision 保持一致
  addonBefore: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  addonAfter: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  thousandSeparator: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string
  ]),
  fixPrecision: React.PropTypes.func
};

InputNumberComponent.defaultProps = {
  thousandSeparator: ',',
  precision: 2,
  scale: 1,
  size: 'small',
  onChange: () => { },
  onBlur: () => { },
  innerRef: () => { } // 设置ref属性
};

export default InputNumberComponent;
