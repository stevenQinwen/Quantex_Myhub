---
order: 12
title: 强制更新
---

## zh-CN

强制更新下拉菜单选项。

````jsx
import { Select } from 'components';
import { Button, message } from 'antd';

class App extends React.Component {
  state = {
    change: false
  }
  handleForceUpdate = () => {
    this.setState({
      change: true
    }, () => {
      message.success("更新成功");
    });
  }
  render() {
    return (
      <div>
        <Button onClick={this.handleForceUpdate} size="small" type="primary" style={{ marginBottom:10 }}>forceUpdate</Button>
        <Select forceUpdateDict dictUrl="/api/v2/users/dict" dictKey="id_name" />
      </div>
    );
  }
}

ReactDOM.render(
  <App />
, mountNode);
````
