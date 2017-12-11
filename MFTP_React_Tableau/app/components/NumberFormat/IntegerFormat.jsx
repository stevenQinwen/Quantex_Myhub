import React from 'react';
import NumberFormat from './NumberFormat';

class IntegerFormat extends React.Component {
  render() {
    return (
      <NumberFormat precision={0} {...this.props}/>
    );
  }
}

export default IntegerFormat;
