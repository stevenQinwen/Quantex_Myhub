---
order: 2
title: 全部
---

所有用法。

```jsx
import { InputGroup } from 'components';

const items = [{
  component: "Input",
  index: 0,
  props: {
    placeholder: "请输入"
  }
},{
  component: "Cascader",
  index: 1,
  props: {
    placeholder: "请选择",
    treeUrl: "/api/v2/menus/list",
  }
}, {
  component: "DatePicker",
  index: 2,
  props: {
    placeholder: "请选择时间"
  }
}, {
  component: "Select",
  index: 3,
  props: {
    placeholder: "请选择",
    dictUrl: "/api/v2/dictdatas/dict",
    dictKey: "user_group_role"
  }
}, {
  component: "TreeSelect",
  index: 4,
  props: {
    placeholder: "请选择",
    treeUrl: "/api/v2/menus/list",
  }
}, {
  component: "TenThousandNumber",
  index: 5,
  props: {
    placeholder: '最大金额'
  }
},{
  component: "至",
},{
  component:"Checkbox",
  index:6,
  valuePropName:"checked",
  props:{
    children:"选择"
  }
}]
    
ReactDOM.render(
  <InputGroup items={items}/>
, mountNode);
```
