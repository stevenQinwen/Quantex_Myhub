---
order: 6
title: 指定后台服务
---

自动从指定的后台服务获取数据。

```jsx
import { Cascader } from 'components';
import { message } from 'antd';

const treeData = [
  { id: 0, pId: 0, name: '条件因子' },
  { id: 1, pId: 1, name: '计算因子' },
  { id: 2, pId: 2, name: '特殊因子' },
  { id: '0_0', pId: 0, name: '持仓类' },
  { id: '0_1', pId: 0, name: '规模类', disabled: true },
  { id: '0_2', pId: 0, name: '资产类' },
  { id: '0_3', pId: 0, name: '保证金类' }
];

function onInit(){
  message.success("运行onInit函数");
}
    
ReactDOM.render(
  <Cascader treeData={treeData} onInit={onInit}/>
, mountNode);
```
