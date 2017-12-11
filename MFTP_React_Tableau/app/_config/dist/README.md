# About this folder

## api.js
不同环境下的`api`配置,修改对应的`api.js`即可

请忽更改外层`api.js`文件

此文件修改不会被监听, 因为只对生产环境有效, 所以不会产生实时的影响

## index.html
不同环境下的主入口html,决定了要从加载app.js

一般不需要修改

此文件更改不需要重新打包,直接跑 npm run dist 即可
