---
order: 1
title: 鼠标悬浮
---

## zh-CN

鼠标悬浮时展示全部。

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
  <Translate showTitle={true} value={1} dictData={transData}/>
, mountNode);
```
