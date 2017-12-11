---
order: 3
title: 多选
---

## zh-CN

渲染多个。

```jsx
import { Translate } from 'components';
    
ReactDOM.render(
  <Translate transUrl="/api/v2/users/dict" multiple transKey="id_name" value={'1,2'}/>
, mountNode);
```
