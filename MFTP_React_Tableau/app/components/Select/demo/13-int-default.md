---
order: 13
title: int传值
---

## zh-CN

支持`int`类型传值。


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
  <Select defaultValue={0} dictData={dictData} />
, mountNode);
````
