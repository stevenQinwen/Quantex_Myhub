const iconUrlPrePath = process.env.REACT_WEBPACK_ENV === 'dev' ? '/assets/' : '../';

module.exports = {
  'icon-url': `'${iconUrlPrePath}antfont/iconfont'`,
  'border-radius-base': '2px'
};
