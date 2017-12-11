/**
 * Created by Jack on 2017/6/29.
 */
import ReactDOM from 'react-dom';

class KeyStore {
  formItems = []; // item = {fieldName, comRef}
  events = ['Enter', 'ArrowUp', 'ArrowDown', 'Space', 'Escape'];

  constructor(formCls) {
    this.formCls = formCls;
  }

  initEvent = () => {
    // 监听键盘事件，过滤有效事件，处理事件
    document.querySelector(this.formCls).addEventListener('keydown', (event) => {
      if (this.events.includes(event.code)) {
        this.handleEvent(event);
      }
    }, true); // 在事件捕获阶段处理,以覆盖有些组件本身的事件处理
  }

  getFormClassName = () => {
    return this.formCls.substring(1);
  }

  handleEvent = (event) => {
    let ele = event.srcElement;
    let curIndex = this.getIndex(ele); // 找到当前元素的index值,用于定位目前处于哪个组件上
    logger.debug('curIndex', curIndex);
    switch (event.code) {
      case 'Enter': // 下一个组件,提交表单
        if (this.isIgnore(ele)) { // 判断是否忽略事件处理
          break;
        }
        let focusedDom = this.next(curIndex); // 将焦点移动到下一个组件,并返回焦点元素
        if (focusedDom && focusedDom.type != 'submit') { // 如果非提交按钮,则禁用默认事件处理(主要是Enter键回触发表单提交)
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      case 'ArrowUp': // 上一个组件
        if (this.isIgnore(ele)) {
          break;
        }
        this.prev(curIndex);
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'ArrowDown': // 下一个组件
        if (this.isIgnore(ele)) {
          break;
        }
        this.next(curIndex);
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Space': // 模拟触发点击事件
        let dom = this.findDom(curIndex);
        dom.click();
        event.preventDefault();
        break;
      case 'Escape': // 重置焦点
        this.reset();
        event.preventDefault();
        event.stopPropagation();
        break;
      default:
        break;
    }
  }
  // 寻找元素本身或者它父元素的index值(递归)
  getIndex = (ele) => {
    if (ele == null) {
      logger.error('index not found');
      return -1;
    }
    if (ele.hasAttribute('index')) {
      return parseInt(ele.getAttribute('index'), 10);
    } else {
      return this.getIndex(ele.parentElement);
    }
  }
  isIgnore = (src) => {
    // 如果是模糊搜索组件,且当前处于输入状态,则忽略事件处理
    if (src.nodeName == 'INPUT' && src.className == 'ant-select-search__field') {
      return true;
    }
    return false;
  }
  // 找到当前焦点的下个焦点组件,并返回焦点元素
  next = (index) => {
    for (let i = index + 1; i < this.formItems.length; i++) {
      let ref = this.formItems[i];
      if (ref == null) continue;
      if (ref.props.disabled) continue; // 禁用控件忽略
      return this.focus(i);
    }
    return null;
  }
  // 找到当前焦点的上一个焦点组件,并返回焦点元素
  prev = (index) => {
    for (let i = index - 1; i >= 0; i--) {
      let ref = this.formItems[i];
      if (ref == null) continue;
      if (ref.props.disabled) continue;
      return this.focus(i);
    }
    return null;
  }
  // 设置焦点
  focus = (index) => {
    let dom = this.findDom(index);
    dom && dom.focus();
    return dom;
  }
  // 根据index属性找元素(该元素必须可设置焦点)
  findDom = (index) => {
    let selector = `div[index="${index}"] div[tabindex], div[index="${index}"] input, div[index="${index}"] button, span[index="${index}"] input`;
    let dom = document.querySelector(selector);
    logger.log("dom", dom);
    if (dom == null) {
      logger.error('selector not found', selector);
    }
    return dom;
  }
  // 重置焦点(第一个)
  reset = () => {
    this.next(-1);
  }
  // 重置焦点(最后一个)
  resetLast = () => {
    this.prev(this.formItems.length);
  }
  // 设置组件的ref属性,用于后续找到该组件元素用
  setRef = (ref, index) => {
    if (ref) { // 如果为null,一般为组件销毁时调用
      let dom = ReactDOM.findDOMNode(ref);
      dom.parentElement.setAttribute('index', index);
    }
    this.formItems[index] = ref;
  }
  /**
   * 设计返回一个Object对象, 主要包含ref函数
   * 通过拦截其get行为,让index值每次获取都递增1,利用闭包的特性
   * 在setRef的时候作为参数传过去.
   * @returns {Object}
   */
  getProps = () => {
    return Object.create(Object.prototype, {
      index: {
        writable: true,
        value: 0
      },
      keyStore: {
        value: this
      },
      ref: {
        get: function () {
          let _this = this;
          let _index = this.index;
          this.index++;
          return function (ref) {
            _this.keyStore.setRef(ref, _index);
          };
        }
      },
      onOpenChange: { // 专门给DatePicker组件用
        get: function () {
          let _index = this.index - 1;
          let _this = this;
          return function (status) {
            !status && _this.keyStore.focus(_index);
          };
        }
      }
    });
  }
}

export default KeyStore;
