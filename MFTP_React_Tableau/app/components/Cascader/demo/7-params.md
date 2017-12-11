---
order: 7
title: 过滤参数
---

按参数过滤选项。

```jsx
import { Cascader } from 'components';

ReactDOM.render(
  <Cascader treeUrl="/api/v2/conditionfactors/cascadelist/condition" treeParams={{ 'site': 'poolsetting' }} treeSite="qcw"/>
, mountNode);
```
