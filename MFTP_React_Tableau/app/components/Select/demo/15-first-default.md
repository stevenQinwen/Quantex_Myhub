---
order: 15
title: 默认首选
---

## zh-CN

使用下拉选项的第一项作默认值。


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
  <Select dictData={dictData} defaultSelectFirstOption/>
, mountNode);
````
