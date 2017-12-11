---
order: 17
title: 数据预处理
---

## zh-CN

对下拉数据进行预处理。


```jsx
import { Select } from 'components';

const dictData = [];
for (let i = 0; i < 36; i++) {
  dictData.push({
    id: i + '',
    name: 'xxx' + i.toString(36) + i
  });
}

function preHandle(list) {
  return list.map((item) => {
    item.name += "test";
    return item;
  });
}
    
ReactDOM.render(
  <Select dictData={dictData} preHandleDictData={preHandle}/>
, mountNode);
```
