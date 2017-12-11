import React from 'react';
import DateTimeTranslate from './DateTimeTranslate';

class TimeTranslateComponent extends React.Component {
  render() {
    return (
      <DateTimeTranslate {...this.props} format="HH:mm:ss"/>
    );
  }
}

export default TimeTranslateComponent;
