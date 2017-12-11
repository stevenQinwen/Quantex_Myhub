---
order: 16
title: 监听value
---

## zh-CN

由上层组件管理`value`状态。


````jsx
import { Select } from 'components';

class App extends React.Component {
  state = {
    value: 1
  }
  handleChange = (value) => {
    this.setState({
      value
    });
  }
  render() {
    const { value } = this.state;
    const dictData = [];
    for (let i = 0; i < 36; i++) {
      dictData.push({
        id: i + '',
        name: 'xxx' + i.toString(36) + i
      });
    }
    return (
      <Select value={value} dictData={dictData} onChange={this.handleChange} />
    );
  }
}


ReactDOM.render(
  <App />
, mountNode);
````
