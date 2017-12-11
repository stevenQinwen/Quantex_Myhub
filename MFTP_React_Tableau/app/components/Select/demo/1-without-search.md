---
order: 1
title: 不带搜索框
---

## zh-CN

单选、不带搜索框。

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
  <Select showSearch={false} dictData={dictData}/>
, mountNode);
````
