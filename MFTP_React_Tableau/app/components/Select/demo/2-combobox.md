---
order: 2
title: 不清除搜索值
---

## zh-CN

单选、失焦时不清除已输入的搜索值。

````jsx
import { Select } from 'components';

const dictData = [];
    for (let i = 0; i < 36; i++) {
      dictData.push({
        id: i + '',
        name: 'xxx' + i.toString(36) + i
      });
    }
    
ReactDOM.render(
  <Select mode="combobox" dictData={dictData}/>
, mountNode);
````
