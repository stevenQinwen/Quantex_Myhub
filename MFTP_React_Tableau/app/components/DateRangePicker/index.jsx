import React from 'react';
import moment from 'moment';
import { InputGroup } from 'components';

class DateRangePickerComponent extends React.Component {

  constructor(props) {
    super(props);
    const value = this.props.value || [];
    this.state = { value };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      let value = nextProps.value || [];
      value = value.map((item) => {
        // 如果传入的是字符串则将其转化为 moment 对象
        if (typeof item === 'string') {
          return moment(item);
        }
        return item;
      });
      this.setState({ value });
    }
  }

  /**
   * 手动处理时间选择
   * @param date 具体日期 moment 对象
   * @param dateString 时间字符串
   * @param index 0: start, 1: end
     */
  handleChange = (value) => {
    logger.info(value);
    const { onChange } = this.props;
    if (onChange) {
      if ('valueFormat' in this.props) {
        const formatValue = value.map((item) => {
          return item && item.format(this.props.valueFormat);
        });
        this.props.onChange(formatValue);
      } else {
        this.props.onChange(value);
      }
    }
    if (!this.props.trigger) this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { format } = this.props;
    const items = [{
      component: "DatePicker",
      index: 0,
      props: {
        placeholder: "开始时间",
        size: "small",
        style: { width: "100%" },
        format
      }
    }, {
      component: "DatePicker",
      index: 1,
      props: {
        placeholder: "结束时间",
        size: "small",
        style: { width: "100%" },
        format
      }
    }];
    return (
      <InputGroup {...this.props} items={items} value={value} onChange={this.handleChange} />
    );
  }
}

export default DateRangePickerComponent;
