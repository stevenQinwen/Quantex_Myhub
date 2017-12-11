---
order: 5
title: 失去焦点
---

失去焦点事件。

```jsx
import { InputNumber } from 'components';
import { message } from 'antd';

function onBlur() {
  message.success("失去焦点");
}

ReactDOM.render(
  <InputNumber onBlur={onBlur} />
, mountNode);
```
