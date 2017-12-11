---
order: 4
title: 监听value
---

由上层组件管理`value`状态。

````jsx
import { InputNumber } from 'components';

class App extends React.Component {
  state = {
    value: 1000
  }
  handleChange = (value) => {
    this.setState({
      value
    });
  }
  render() {
    const { value } = this.state;
    return (
      <InputNumber value={value} onChange={this.handleChange}/>
    );
  }
}

ReactDOM.render(
  <App />
, mountNode);
````
