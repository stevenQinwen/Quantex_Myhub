import { observable, action } from 'mobx';

class Store {
  initProp = {}; // sidebar 初始化配置
  @observable props = {
    opened: false,
    title: '',
    bar: null,
    onOpen: this.open,
    onClose: this.close,
    width: 332,
    side: 'right'
  };

  constructor(props = {}) {
    this.setProps(props);
    // props 中定制高度时缓存
    this.initProp = Object.assign({ width: 332 }, props);
  }

  /**
   * 打开 sidebar
   * @param {string} title sidebar标题
   * @param {ReactComponent} bar 弹出框组件
   * @param {object} opt 配置项
   */
  open = action((title, bar, opt) => {
    const option = [
      this.props,
      this.initProp, // 重置为默认配置
      opt, // opt 中存在宽度时覆盖默认宽度
      { opened: true, title, bar }
    ];
    Object.assign(...option);
  });

  setProps = action((props) => {
    this.initProp = Object.assign(this.initProp, props);
  });

  close = action(() => {
    this.props.opened = false;
  });
}

export default Store;
