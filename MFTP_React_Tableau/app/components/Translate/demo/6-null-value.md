---
order: 6
title: 空值
---

## zh-CN

字典`value`为空时的显示。

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
  <Translate dictData={transData} nullValueContent="--未匹配--"/>
, mountNode);
```
