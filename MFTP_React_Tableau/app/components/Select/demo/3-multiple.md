---
order: 3
title: 多选
---

## zh-CN

带搜索多选。

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
  <Select mode="multiple" dictData={dictData}/>
, mountNode);
````
