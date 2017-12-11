---
order: 4
title: 右键菜单
---

右键菜单的配置。

```jsx
import { ListSelect } from 'components';
import { message } from 'antd';

function handleContextMenuClick(item){
  message.success("编辑");
}

ReactDOM.render(
  <ListSelect 
    listUrl="/api/v2/rulefundgroups/dict" 
    listKey="id_name" 
    listSite="qcw" 
    contextMenuConfig={{
      onItemClick: handleContextMenuClick,
      items: [{
        action: 'edit',
        name: '编辑'
      }]
    }}
  />
, mountNode);
```
