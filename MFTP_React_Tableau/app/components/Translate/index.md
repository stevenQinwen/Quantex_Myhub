---
category: Components
subtitle: 字典转换
title: Translate
---

字典转化组件。

## 何时使用

根据数据字典自动转化传入的数据。

## API

### Extended TreeSelect props

| 参数               | 说明               | 类型      | 默认值    |
| ---------------- | ---------------- | ------- | ------ |
| dictData         | 字典数据             | array   | []     |
| transUrl         | 字典路径             | string  | -      |
| transKey         | 字典字段             | string  | -      |
| transParams      | 过滤参数             | object  | {}     |
| transSite        | 服务名称             | string  | 'auth' |
| separator        | 分割符(需开启multiple) | string  | '/'    |
| nullValueContent | 空值时的显示内容            | string  | '--'   |
| showTitle        |  是否显示title                | boolean | false  |
