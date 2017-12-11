const modules = require.context(".", true, /index\.jsx$/);
const moduleMap = new Map(); // 所有页面组件Map集合

modules.keys().forEach((key) => {
  const hashKey = key.replace(/\.\//, '').replace(/\/index\.jsx/, '');
  moduleMap.set(hashKey, modules(key).default);
});

export default moduleMap;
