const menuList = [{
  name: '统一认证',
  items: [{
    name: '权限管理',
    icon: 'quanxianguanli',
    items: [{
      name: '角色权限管理',
      link: 'auth/right/Role'
    }, {
      name: '权限组管理',
      link: 'auth/right/RightGroup'
    }]
  }, {
    name: '系统管理',
    icon: 'xitongguanli',
    items: [{
      name: '部门管理',
      link: 'auth/system/Department'
    }, {
      name: '角色管理',
      link: 'auth/system/Role'
    }, {
      name: '权限设置',
      link: 'auth/system/Right'
    }, {
      name: '用户权限',
      link: 'auth/system/User'
    }, {
      name: '用户管理',
      link: 'auth/system/User'
    }, {
      name: '字典管理',
      link: 'auth/system/Dictionary'
    }, {
      name: 'websocket消息推送',
      link: 'auth/system/Message'
    }]
  }]
}, {
  name: '外部测试iFrame',
  items: [{
    name: '百度',
    link: 'http://www.baidu.com'
  }, {
    name: '京东',
    link: 'http://www.jd.com'
  }]
}];

export default menuList;
