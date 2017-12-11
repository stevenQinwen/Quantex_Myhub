import React from 'react';
import { Button } from 'antd';
import Upload from './index';

const Dragger = Upload.Dragger;

class DemoComponent extends React.Component {
  render() {
    const props = {
      name: 'file',
      uploadSite: 'qaw',
      action: "/api/v2/funds/import/test",
    };
    return (
      <div>
        <h1>基础使用</h1>
        <code>{`<Upload {...props}><Button type="primary" size="small"></Button></Upload>`}</code>
        <Upload {...props}>
          <Button type="primary" size="small">
            选择文件
          </Button>
        </Upload>
        <h1>拖拽上传</h1>
        <code>{`<Dragger {...props}><h1>drag file to this area or click to upload</h1></Dragger>`}</code>
        <Dragger {...props}>
          <h1>drag file to this area</h1>
        </Dragger>
      </div>
    );
  }
}

export default DemoComponent;
