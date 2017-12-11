---
category: Components
subtitle: 列表选择
title: ListSelect
---

列表选择组件。

## 何时使用

选择列表中的一项时。

## API

### Extended TreeSelect props

| 参数             | 说明     | 类型                        | 默认值         |
| -------------- | ---------------------------------------- | ------------------------- | ----------- |
| listData       | 下拉选项   | array or object           | []          |
| listUrl     | 字典路径   | string                    | -          |
| listKey     | 字典字段   | string                    | -          |
| listParams     | 过滤参数   | object                    | {}          |
| listSite       | 服务名称   | string                    | 'auth'      |
| forceUpdateList | 是否可强制刷新 | boolean | false|
| onSelect | 选择一项的回调 | function | () => {}|
| contextMenuConfig | 右键菜单配置 | object | -|
| title | 标题   | string or element  | -         |
