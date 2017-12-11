import React from 'react';
import _ from 'lodash';
import NumberFormat from './NumberFormat';

class PercentFormat extends React.Component {

  render() {
    let value = this.props.value;

    if (_.isNumber(value) || _.isString(value)) {
      value *= 100;
    }

    return (
      <NumberFormat {...this.props} value={value} />
    );
  }
}


PercentFormat.defaultProps = {
  ...NumberFormat.defaultProps,
  suffix: '%'
};

export default PercentFormat;
