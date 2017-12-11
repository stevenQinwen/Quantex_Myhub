import React from 'react';
import Upload from './Upload';

class DraggerComponent extends React.Component {
  render() {
    return (
      <Upload type="drag" {...this.props}>
        {this.props.children}
      </Upload>
    );
  }
}

export default DraggerComponent;
