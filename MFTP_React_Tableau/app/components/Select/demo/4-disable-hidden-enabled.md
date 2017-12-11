---
order: 4
title: 禁用、隐藏
---

## zh-CN

禁用、隐藏某些值。

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
  <Select disabledValues={['1', '2', '3']} hiddenValues={['4', '5', '6']} dictData={dictData}/>
, mountNode);
````
