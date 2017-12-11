---
order: 1
title: 后台数据
---

直接获取后台列表数据。

```jsx
import { ListSelect } from 'components';

ReactDOM.render(
  <ListSelect listUrl="/api/v2/rulefundgroups/dict" listKey="id_name" listSite="qcw" />
, mountNode);
```
