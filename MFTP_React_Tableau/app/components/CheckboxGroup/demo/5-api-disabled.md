---
order: 5
title: 禁用
---

## zh-CN

disabled属性用法,直接设置为true时全部禁用。

```jsx
import { CheckboxGroup } from 'components';
    
ReactDOM.render(
  <CheckboxGroup showCheckAll disabled={(option) => { return option.id == "1"; }} dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
, mountNode);
```
