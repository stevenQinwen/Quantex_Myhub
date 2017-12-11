---
order: 4
title: 强制刷新
---

## zh-CN

重新渲染字典。

```jsx
import { message, Button } from 'antd';
import { Translate } from 'components';

class App extends React.Component {
  state = {
    change: false
  }
  handleForceUpdate = () => {
    this.setState({
      change: true
    }, () => {
      message.success("刷新成功");
    });
  }
  render() {
    return (
      <div>
        <Button onClick={this.handleForceUpdate} size="small" type="primary" style={{ marginBottom: 10 }}>forceUpdate</Button>
        <br />
        <Translate transUrl="/api/v2/users/dict" transKey="id_name" value={'1'} forceUpdateTrans />
      </div>
    );
  }
}

ReactDOM.render(
  <App />
, mountNode);
```
