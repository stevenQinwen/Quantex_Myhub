---
order: 5
title: 万元
---

万元显示。

```jsx
import { NumberFormat } from 'components';

const { TenThousandFormat } = NumberFormat;
    
ReactDOM.render(
  <div>
    <TenThousandFormat value={12345678} suffix="万"/>
  </div>
, mountNode);
```
