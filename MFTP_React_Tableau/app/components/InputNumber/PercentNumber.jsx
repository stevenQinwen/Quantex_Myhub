import InputNumber from './InputNumber';

class PercentNumber extends InputNumber {

}

/**
 * 一般来说 fixPrecision 和 precision 存在差值2
 * 这个差值即为实际的小数位数验证
 * 通过指定配置参数可模拟实现百分比 千分比 甚至万分比的传入值
 */
PercentNumber.defaultProps = Object.assign({}, InputNumber.defaultProps, {
  addonAfter: '%',
  scale: 0.01,
  max: 1,
  min: 0
});

export default PercentNumber;
