---
order: 2
title: 远程数据
---

## zh-CN

获取后台数据字典。

```jsx
import { Translate } from 'components';
    
ReactDOM.render(
  <Translate transUrl="/api/v2/users/dict" transKey="id_name" value={1}/>
, mountNode);
```
