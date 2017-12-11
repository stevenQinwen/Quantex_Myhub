import React from 'react';
import moment from 'moment';

class DateTimeTranslateComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  getDateTimeStr = () => {
    let { value } = this.state;
    const { nullValueContent, originFormat } = this.props;
    if (value) {
      try {
        if (`${value}`.length === 8) {
          value = `${value}`; // 兼容后台返回8位数字 20170523
        }
        let dt;
        if (originFormat) {
          dt = moment(value, originFormat);
        } else {
          dt = moment(value);
        }
        return dt.format(this.props.format);
      } catch (e) {
        logger.error('DateTimeTranslate error:', e, value);
        return nullValueContent;
      }
    } else {
      return nullValueContent;
    }
  }

  render() {
    return (
      <span>{this.getDateTimeStr()}</span>
    );
  }
}

DateTimeTranslateComponent.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]).isRequired,
  format: React.PropTypes.string,
  originFormat: React.PropTypes.string,
  nullValueContent: React.PropTypes.string
};
DateTimeTranslateComponent.defaultProps = {
  nullValueContent: '--',
  format: 'YYYY-MM-DD HH:mm:ss'
};

export default DateTimeTranslateComponent;
