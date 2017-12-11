import React from 'react';
import _ from 'lodash';

// 该组件为Number的展示型组件
// 0.默认处理props.value的值
// 1.默认为千分位显示
// 2.支持指定精度(precision), 默认显示小数点后两位
// 3.支持前缀,后缀(prefix, suffix),无默认值, 支持字符串和react dom
// 4.支持null值特殊显示(nullValueContent), 默认显示'--'
class NumberFormatComponent extends React.Component {

  /**
   * 格式化 value: 实现精确小数位,以及千分位
   * @param value
   * @param precision
   */
  format = (value, precision) => {
    if (value === null) {
      return value;
    }
    let number = _.toNumber(value);

    if (_.isNaN(number)) {
      return null;
    }
    // 如果是无穷值
    if (!isFinite(number)) {
      return null;
    }

    number = _.round(number, precision); // 根据 precision 四舍五入 number;
    number = number.toFixed(precision);  // 格式化数字， 必要时进行四舍五入, 同时会在必要时用 0 填充小数部分,到达指定的小数位数;

    // 实现value千分位显示
    let index = number.indexOf('.');  // 指定值第一次出现的索引,如果没有找到,为 -1
    let reg = /(\d)(?=(?:\d{3})+$)/g; // 解释可见: http://www.tuicool.com/articles/AZrMjmJ
    if (index > -1) {
      // value 浮点
      return number.substring(0, index).replace(reg, '$1,') + number.substring(index);
    } else {
      // value 整数
      return number.replace(reg, '$1,');
    }
  }

  render() {
    const { value, precision, prefix, suffix, nullValueContent, className } = this.props;
    const number = this.format(value, precision);
    const items = [];
    if (number !== null) {
      prefix && items.push(prefix);
      items.push(number);
      suffix && items.push(suffix);
    } else {
      items.push(nullValueContent);
    }
    return <span className={className}>{items}</span>;
  }
}
// 利用组件提供的validator验证传入的值是否有效
NumberFormatComponent.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  precision: React.PropTypes.number,
  prefix: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  suffix: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  nullValueContent: React.PropTypes.string
};

NumberFormatComponent.defaultProps = {
  precision: 2,
  nullValueContent: '--',
  className: ''
};

export default NumberFormatComponent;
