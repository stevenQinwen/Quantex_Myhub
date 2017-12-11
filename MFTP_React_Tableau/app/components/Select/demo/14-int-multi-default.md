---
order: 14
title: 多个int默认值
---

## zh-CN

多选模式下使用多个`int`类型作默认值。


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
  <Select mode="multiple" defaultValue={[0, 1, 2]} dictData={dictData} />
, mountNode);
````
