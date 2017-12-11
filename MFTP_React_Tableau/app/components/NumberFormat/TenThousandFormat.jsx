import React from 'react';
import _ from 'lodash';
import NumberFormat from './NumberFormat';

// 万元
class TenThousandFormat extends React.Component {
  render() {
    let value = this.props.value;

    if (_.isNumber(value) || _.isString(value)) {
      value /= 10000;
    }
    return (
        <NumberFormat {...this.props} value={value} />
    );
  }
}

export default TenThousandFormat;
