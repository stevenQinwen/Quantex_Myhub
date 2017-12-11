---
order: 10
title: 多选模糊搜索
---

## zh-CN

多选模式下的模糊搜索(显示有问题,尽量不要用)。

````jsx
import { Select } from 'components';

ReactDOM.render(
  <Select mode="multiple" fuzzySearch={true} dictUrl="/api/v2/users/dict" dictKey="id_name" />
, mountNode);
````
