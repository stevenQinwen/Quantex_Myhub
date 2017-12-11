---
order: 6
title: 后台列表数据
---

## zh-CN

组件内直接向后台请求列表数据。

````jsx
import { Select } from 'components';

ReactDOM.render(
  <Select dictUrl="/api/v2/users/dict" dictKey="id_name"/>
, mountNode);
````
