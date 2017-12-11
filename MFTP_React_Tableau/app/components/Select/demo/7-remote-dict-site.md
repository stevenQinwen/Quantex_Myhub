---
order: 7
title: 指定服务的后台字典数据
---

## zh-CN

组件内直接向指定后台服务请求字典类型的列表数据。

````jsx
import { Select } from 'components';

ReactDOM.render(
  <Select dictUrl="/api/v2/date_templets/dict" dictKey="date_templet" dictSite="qow" />
, mountNode);
````
