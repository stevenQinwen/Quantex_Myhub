---
order: 5
title: 指定后台服务
---

自动从指定的后台服务获取数据。

```jsx
import { Cascader } from 'components';
    
ReactDOM.render(
  <Cascader treeUrl="/api/v2/rulefactors/factortype/tree" treeSite="qcw"/>
, mountNode);
```
