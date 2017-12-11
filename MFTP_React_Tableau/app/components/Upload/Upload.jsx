import React from 'react';
import { Upload } from 'antd';
import API from 'utils/API';

class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.api = new API(props.uploadSite);
  }
  handleProps = () => {
    const { action, uploadParams } = this.props;
    const url = this.api._makeURL(action, uploadParams, 'GET').url;
    return {
      action: url,
      headers: this.api._handleHeader()
    };
  }
  render() {
    const props = this.handleProps();
    return (
      <Upload {...this.props} {...props}>
        {this.props.children}
      </Upload>
    );
  }
}

UploadComponent.propTypes = {
  uploadSite: React.PropTypes.string.isRequired,
  uploadParams: React.PropTypes.object
};
UploadComponent.defaultProps = {
  uploadParams: {}
};

export default UploadComponent;
