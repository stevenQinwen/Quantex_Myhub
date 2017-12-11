---
order: 5
title: 标题
---

显示标题。

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
  <ListSelect listData={listData} title="标题"/>
, mountNode);
```
