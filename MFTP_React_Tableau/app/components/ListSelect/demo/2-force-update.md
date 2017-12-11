---
order: 2
title: 强制更新
---

## zh-CN

强制更新列表选项。

````jsx
import { ListSelect } from 'components';
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
        <ListSelect forceUpdateList listUrl="/api/v2/users/dict" listKey="id_name" />
      </div>
    );
  }
}

ReactDOM.render(
  <App />
, mountNode);
````
