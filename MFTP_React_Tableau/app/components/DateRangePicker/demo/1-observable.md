---
order: 1
title: 监听value
---

由上层组件管理`value`状态。

```jsx
import { DateRangePicker } from 'components';
    
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
      <DateRangePicker value={value} onChange={this.handleChange}/>
    );
  }
}


ReactDOM.render(
  <App />
, mountNode);
```
