---
order: 2
title: 前后标签
---

输入框首尾标签。

```jsx
import { InputNumber } from 'components';
import { Icon } from 'antd';

ReactDOM.render(
  <InputNumber addonBefore="Http://" addonAfter={<Icon type="setting" />} />
, mountNode);
```
