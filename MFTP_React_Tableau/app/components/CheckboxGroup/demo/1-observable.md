---
order: 1
title: 监听value
---

## zh-CN

由上层组件管理`value`状态。

```jsx
import { CheckboxGroup } from 'components';
    
class App extends React.Component {
  state = {
    value: []
  }
  handleChange = (value) => {
    this.setState({
      value
    });
  }
  render() {
    const { value } = this.state;
    return (
      <CheckboxGroup value={value} onChange={this.handleChange} options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1" }]} />
    );
  }
}

ReactDOM.render(
  <App />
, mountNode);
```
