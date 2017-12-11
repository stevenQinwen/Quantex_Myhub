---
category: Components
subtitle: 数字输入框
title: InputNumber
---

数字输入框组件。

## 何时使用

按配置展示输入框。

## API

### Extended TreeSelect props

| 参数               | 说明               | 类型      | 默认值    |
| ---------------- | ---------------- | ------- | ------ |
| prefix         | 输入值的前缀             | string   | -     |
| suffix         | 输入值的后缀            | string   | -     |
| addonBefore         | 带标签的 inputNumber，设置前置标签             | string|ReactNode   | -     |
| addonAfter         | 带标签的 inputNumber，设置后置标签             | string|ReactNode   | -     |
| thousandSeparator | 千分位分隔符             | string   | ','     |
| precision | 保留小数             | number   | 2     |
| onChange | 输入值变化的回调             | function   | () => {}    |
| onBlur | 失去焦点的回调             | function   | () => {}    |
| innerRef | 设置ref             | function   | () => {}    |
