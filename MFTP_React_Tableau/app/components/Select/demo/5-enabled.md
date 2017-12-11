---
order: 5
title: 可用选项
---

## zh-CN

设置仅某些选项可用。

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
  <Select enabledValues={["2","4"]} dictData={dictData}/>
, mountNode);
````
