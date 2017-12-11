---
order: 16
title: 项目README
toc: true
---

全称：MFTP项目
   (这个项目是将PAS组合业绩归因系统拷贝过来的)

简介：针对投资管理组合的资产分布数据进行汇总和分析，以解析出不同投资标的的风险和收益情况，为未来的投资提供参考。

## 框架介绍

- **核心技术栈**：Electron + React + ES6/ES7 + MobX + Antd  + Webpack + NodeJS + RAP
- **CSS技术栈**：Sass + css-modules + AutoPrefixer + iconfont
- **代码质量检测**：Eslint + Htmlhint + Csslint
- **单元测试**：Karma(启动器) + Mocha(测试框架) + Chai(断言库)
- **调试工具**：Electon + React DevTools + MobX DevTools
- **开发服务**: nodemon + http-proxy 代理网络请求

## 目录结构

```
 |__ app - 项目源码
   |__ config - 项目配置
     |__ dev - 开发环境相关配置文件目录
       |__ api.js - 开发环境的网络环境配置
       |__ index.html - 开发环境下的主入口文件
     |__ dist - 生产环境相关配置文件目录
       |__ api.js - 生产环境的网络环境配置
       |__ index.html - 生产环境下的主入口文件
     |__ api.js - 项目当前使用的网络环境配置 ( 根据环境自动生成的文件 )
   |__ common - 全局通用代码文件目录 ( 如：扩展 window 对象的属性的函数 )
   |__ components - 展示组件
   |__ containers - 容器组件
   |__ images - 图片资源
   |__ styles - 样式
   |__ utils - 项目通用工具目录
   |__ index.html - 项目访问入口
   |__ index.js - Webpack 主入口
   |__ main.js - Electron 入口
   |__ package.json - Electron 打包命令配置以及客户端所需依赖包管理
   |__ Router.jsx - 主应用程序路由配置
 |__ build Webpack 打包出来的一些供静态引用的文件(程序自动生成目录)
   |__ lib.js 把一些声明好的第三方库文件打包成 lib.js 供页面引用,提升性能
 |__ cfg - webpack 各个环境配置
   |__ base.js - webpack 基本配置
   |__ defaults.js - 变量配置
   |__ dev.js - 开发环境配置
   |__ dist.js - 生产环境配置
   |__ test.js - 测试环境配置
 |__ dist - 生产代码
 |__ release - 存放打包应用程序
 |__ .babelrc - es6 转义配置
 |__ .csslintrc - csslint 配置
 |__ .editorconfig - 编辑器统一风格配置
 |__ .eslintrc - eslint 配置
 |__ .eslintignore - eslint 忽略配置
 |__ .gitignore - git 忽略规则
 |__ .htmlhintrc - htmlhint 配置
 |__ .yo-rc.json - Yomen配置
 |__ antdtheme.js - 定制 antd 主题变量文件
 |__ CHANGELOG.zh-CN.md - 客户端版本更新日志
 |__ karma.conf.js - Karma 配置
 |__ loadtests.js - 匹配项目中所有测试用例文件
 |__ manifest.json - DDL动态库配置文件自动生成的第三方库索引文件,用于 webpack 插件 DllReferencePlugin 快速索引文件(程序自动生成文件)
 |__ package.json - 依赖声明文件
 |__ README.md - 项目指南
 |__ server.js - 本地调试服务启动配置
 |__ server.proxy.js - 代理配置
 |__ server.site.js - 用来编译文档可视化网站的脚本
 |__ sync.design.js - Copied './components' to './quantex-design/components'
 |__ webpack.config.js - webpack 入口
 |__ webpack.ddl.config.js - DDL动态库配置文件, 提升 webpack 打包的性能
   ```

### Install Dependencies.

`npm install` or `cnpm install`(Recommend)

### Development

`npm start`

### Production

generated code to `dist` directory.

`npm run dist`

### Package app

package app to `release` directory.

- step 1: `npm run dist`
- step 2: `npm run build` (mac + win64) or `npm run build-win` or `npm run build-mac` or `npm run build-win32`

or you can package app by one command.

- X64: `npm run dist && npm run build-win`
- X32: `npm run dist && npm run build-win32`
- Mac: `npm run dist && npm run build-mac`
- Mac/X64: `npm run dist && npm run build`

### Test

`npm test` or `npm run test:wacth`


#### DevTools Extension

* [Devtron](https://github.com/electron/devtron) - Install via [electron-debug](https://github.com/sindresorhus/electron-debug).
* [React Developer Tools](https://github.com/facebook/react-devtools) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
* [MobX DevTools](https://github.com/mobxjs/mobx-react-devtools).

## Config File Introduction 

### `.eslintrc`

> [All Rules](http://eslint.cn/docs/rules/)

### `.csslintrc`

默认为打开状态,设置 `false` 可关闭验证规则

> [All Rules](https://github.com/CSSLint/csslint/wiki/Rules)

### `.htmlhintrc`

> [All Rules](https://github.com/yaniswang/HTMLHint/wiki/Rules)

```
{
  "tagname-lowercase": true, // 标签名小写
  "attr-lowercase": true, // 属性名小写
  "attr-value-double-quotes": true, // 属性值双引号
  "attr-no-duplication": true, // 属性不重复
  "title-require": true, // title 标签只能出现在head标签下
  "id-unique": true, // id 唯一
  "spec-char-escape": true, // 特殊字符需转义,如"<",">"
  "tag-self-close": true, // 自包含标签需要关闭符,如<br />
  "tag-pair": true, // 标签配对
  "id-class-ad-disabled": true, // 不出现"ad"前缀的id或class值写法,会被广告拦截
  "id-class-value": "dash", // id, class 只允许使用连接符"-"
  "inline-script-disabled": true, // 不允许在标签内写 script
  "head-script-disabled": true // <script> 标签只能写在 body 尾部
}
```
