---
order: 7
title: 筛选
---

## zh-CN

按需筛选选项。

```jsx
import { CheckboxGroup } from 'components';

filterFunc = (option) => {
  if (option.name.length > 6) {
    return true;
  } else {
    return false;
  }
}
    
ReactDOM.render(
  <CheckboxGroup dictUrl='/api/v2/users/dict' dictKey='id_name' filter={filterFunc} />
, mountNode);
```
