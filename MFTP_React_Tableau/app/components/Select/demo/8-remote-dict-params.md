---
order: 8
title: 筛选参数
---

## zh-CN

组件内向后台按筛选条件请求数据。

````jsx
import { Select } from 'components';

ReactDOM.render(
  <Select dictUrl="/api/v2/users/dict" dictKey="id_name" dictParams={{ companyId: 5 }} />
, mountNode);
````
