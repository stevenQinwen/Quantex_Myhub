---
order: 9
title: 远程搜索
---

## zh-CN

远程搜索，带有节流控制。

````jsx
import { Select } from 'components';

ReactDOM.render(
  <Select fuzzySearch={true} dictUrl="/api/v2/users/dict" dictKey="id_name"/>
, mountNode);
````
