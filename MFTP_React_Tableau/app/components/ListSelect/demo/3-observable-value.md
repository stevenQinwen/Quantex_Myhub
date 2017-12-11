---
order: 3
title: 监听value
---

## zh-CN

由上层组件管理`value`状态。


````jsx
import { ListSelect } from 'components';

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
      <ListSelect value={value} listUrl="/api/v2/users/dict" listKey="id_name" onSelect={this.handleChange} />
    );
  }
}


ReactDOM.render(
  <App />
, mountNode);
````
