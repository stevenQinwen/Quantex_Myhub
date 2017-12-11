---
order: 3
title: 后台数据
---

## zh-CN

直接调用后台接口展示选项。

```jsx
import { CheckboxGroup } from 'components';
    
ReactDOM.render(
  <CheckboxGroup dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
, mountNode);
```
