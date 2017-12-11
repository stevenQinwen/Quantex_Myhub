---
order: 0
title: 基本使用
---

基本用法。

```jsx
import { ListSelect } from 'components';

const listData = [];
for (let i = 1; i < 10; i++) {
  listData.push({
    id: i + '',
    name: 'xxx' + i.toString() + i
  });
}
    
ReactDOM.render(
  <ListSelect listData={listData}/>
, mountNode);
```
