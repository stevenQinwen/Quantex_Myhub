import React from 'react';
import DateTimeTranslate from './DateTimeTranslate';

class DateTranslateComponent extends React.Component {
  render() {
    return (
      <DateTimeTranslate {...this.props} format="YYYY-MM-DD"/>
    );
  }
}

export default DateTranslateComponent;
