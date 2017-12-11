---
category: Components
title: Cascader
subtitle: 级联选择
---

级联选择框。


## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## API

### Extended Select props

| 参数             | 说明                                       | 类型                        | 默认值         |
| -------------- | ---------------------------------------- | ------------------------- | ----------- |
| treeData       | 下拉选项                       | array           | []          |
| treeUrl       | 数据路径             | string          | -      |
| treeParams     | 过滤参数                          | object      | {}          |
| treeSite       | 服务名称             | string          | 'auth'      |
| disabledValues | 禁用选项      | array          | []          |
| onInit | 初始化时调用      | function          | () => {}         |

### 其他props请参考官网 [Cascader](https://ant.design/components/cascader-cn/)
