---
category: Components
subtitle: 选择器
title: Select
---

类似 Select 的选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 [Radio](/components/radio/) 是更好的选择。

## API

### Extended Select props

| 参数             | 说明     | 类型                        | 默认值         |
| -------------- | ---------------------------------------- | ------------------------- | ----------- |
| dictData       | 下拉选项   | array or object           | []          |
| dictUrl     | 字典路径   | string                    | -          |
| dictKey     | 字典字段   | string                    | -          |
| dictParams     | 过滤参数   | object                    | {}          |
| dictSite       | 服务名称   | string                    | 'auth'      |
| disabledValues | 禁用选项   | array                     | []          |
| hiddenValues   | 隐藏选项   | array                     | []          |
| enabledValues | 可用选项(会覆盖disabledValues,但不会显示隐藏的)   | array  | []          |
| fuzzySearch    | 是否开启模糊搜索                                 | boolean                   | false       |
| fuzzyName      | 模糊搜索字段名,参数value为输入值(fuzzySearch为true时可用) | string or function(value) | 'name$like' |
| forceUpdateDict | 是否可强制刷新 | boolean | false|
| preHandleDictData | 数据预处理 | function | -|


### 其他props请参考官网 [Select](https://ant.design/components/select-cn/)
