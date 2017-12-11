---
order: 2
title: 监听value
---

## zh-CN

由上层组件管理`value`状态。


````jsx
import { Cascader } from 'components';

class App extends React.Component {
  state = {
    value: ['0', '0_0']
  }
  handleChange = (value) => {
    this.setState({
      value
    });
  }
  render() {
    const { value } = this.state;
    const treeData = [
      { id: 0, pId: 0, name: '条件因子' },
      { id: 1, pId: 1, name: '计算因子' },
      { id: 2, pId: 2, name: '特殊因子' },
      { id: '0_0', pId: 0, name: '持仓类' },
      { id: '0_1', pId: 0, name: '规模类', disabled: true },
      { id: '0_2', pId: 0, name: '资产类' },
      { id: '0_3', pId: 0, name: '保证金类' }
    ];
    return (
      <Cascader treeData={treeData} value={value} onChange={this.handleChange}/>
    );
  }
}

ReactDOM.render(
  <App />
, mountNode);
````
