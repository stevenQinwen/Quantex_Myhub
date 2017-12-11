---
order: 2
title: 禁用部分选项
---

## zh-CN

将部分选项禁用。

```jsx
import { CheckboxGroup } from 'components';
    
ReactDOM.render(
  <CheckboxGroup defaultValue={["1"]} options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1", disabled: true }]} />
, mountNode);
```
