---
order: 0
title: 基本使用
---

基本用法。

```jsx
import { InputGroup } from 'components';

const items = [{
  component: "Input",
  index: 0,
  props: {
    placeholder: "请输入"
  }
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
