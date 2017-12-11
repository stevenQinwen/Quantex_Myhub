---
category: Components
subtitle: 复选框组
title: CheckboxGroup
---

复选框组组件。

## 何时使用

在一组可选项中进行多项选择时。

## API

### Extended TreeSelect props

| 参数               | 说明               | 类型      | 默认值    |
| ---------------- | ---------------- | ------- | ------ |
| value         | 已选项             | array or object   | []     |
| options         | 复选项             | array or object   | []     |
| dictSite        | 服务名称             | string  | 'auth' |
| dictUrl         | 数据路径             | string  | -      |
| dictKey         | 字典字段             | string  | -      |
| dictParams      | 过滤参数             | object  | {}     |
| onChange        | 变化时回调函数 | function  | -    |
| disabled | 是否全部禁用            | boolean or function  | false   |
| filter        |  筛选方法,参数option为每一个选项           | function(option) | -  |
| showCheckAll        |  是否显示全选按钮           | boolean | false  |
| vertical        |  是否垂直排列           | boolean | false  |
