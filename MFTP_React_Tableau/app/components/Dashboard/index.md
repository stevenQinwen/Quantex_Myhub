---
category: Components
subtitle: 可拖动面板
title: Dashboard
---

可以拖动以及修改区块大小的面板。

## 何时使用

TODO

## API

### Dashboard.Panel

| 参数             | 说明     | 类型                        | 默认值         |
| -------------- | ---------------------------------------- | ------------------------- | ----------- |
| onChange       |  拖动或缩放的回调  | function           | -          |
| className       |  外边框样式  | string           | -          |

### Dashboard.Panel

| 参数             | 说明     | 类型                        | 默认值         |
| -------------- | ---------------------------------------- | ------------------------- | ----------- |
| className       |  可拖动面板样式，可用来设置初始宽度等  | string           | -          |
| defaultWidth       |  默认宽度 | number           | -          |
| defaultHeight       |  默认高度  | number           | -          |
| defaultOrder       |  默认位置(如果设置，则所有Panel都要设置，且不能重复)  | number           | -          |
| xDisabled       |  是否禁止横向拖动  | bool           | -          |
| yDisabled       |  是否禁止纵向拖动  | bool           | -          |
| fixed       |  是否固定位置,(设置为true时dragDisabled自动为true)  | bool           | -          |
| dragDisabled       |  是否禁用拖拽  | bool           | -          |
| xStep       |  横向位移步长(如果时0-1的小数，则按百分比计算，否则按px)  | number           | 1/12          |
| yStep       |  纵向位移步长(按px计算)  | number           | 1/12          |
| minWidth       |  最小宽度  | number           | 0          |
| minHeight       |  最小高度  | number           | 0          |
| maxWidth       |  最大宽度  | number           | 2000          |
| maxHeight       |  最大高度  | number           | 2000          |

### Dashboard.Header

| 参数             | 说明     | 类型                        | 默认值         |
| -------------- | ---------------------------------------- | ------------------------- | ----------- |
| className       |  可拖动面板样式，可用来设置初始宽度等  | string           | -          |
