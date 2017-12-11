---
order: 0
title: 基本使用
---

## zh-CN

基础用法。

```jsx
import { Translate } from 'components';

let transData = [];
for (let i = 1; i < 36; i++) {
  transData.push({
    id: i + '',
    name: 'xxx' + i.toString(36) + i
  });
}
    
ReactDOM.render(
  <Translate value={1} dictData={transData}/>
, mountNode);
```
