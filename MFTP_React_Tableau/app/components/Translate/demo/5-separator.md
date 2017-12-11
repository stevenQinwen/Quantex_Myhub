---
order: 5
title: 分隔符
---

## zh-CN

自定义分隔符。

```jsx
import { Translate } from 'components';
    
ReactDOM.render(
  <Translate transUrl="/api/v2/users/dict" multiple transKey="id_name" value={'1,2'} separator="+"/>
, mountNode);
```
