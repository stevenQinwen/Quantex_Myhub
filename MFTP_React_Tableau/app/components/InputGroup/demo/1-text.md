---
order: 1
title: 插入字符
---

插入字符的用法。

```jsx
import { InputGroup } from 'components';

const items = [{
  component: "Input",
  index: 0,
  props: {
    placeholder: "请输入"
  }
}, {
  component: "至",
}, {
  component: "Input",
  index: 1,
  props: {
    placeholder: "请输入"
  }
}]
    
ReactDOM.render(
  <InputGroup items={items}/>
, mountNode);
```
