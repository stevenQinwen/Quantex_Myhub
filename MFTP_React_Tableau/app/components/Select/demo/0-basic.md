---
order: 0
title: 基本使用
---

单选、默认 可搜索123。

```jsx
import { Select } from 'components';

console.log('render Select', Select);

const dictData = [];
    for (let i = 0; i < 36; i++) {
      dictData.push({
        id: i + '',
        name: 'xxx' + i.toString(36) + i
      });
    }
    
ReactDOM.render(
  <Select dictData={dictData}/>
, mountNode);
```
