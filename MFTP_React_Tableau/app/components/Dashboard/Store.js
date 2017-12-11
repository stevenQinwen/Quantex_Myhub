import { observable, action } from 'mobx';
import _ from 'lodash';
import { findDOMNode } from 'react-dom';

class Store {
  constructor(callback) {
    this.callback = callback; //  保存操作后的回调方法
  }
  timer;  //  计时器，移入时使用
  dashboard;  //  最外层盒子，保存实例 用来计算最大可用宽度
  panelMap = new Map();  //  每个Panel的order、宽高;
  @observable pKey; //  dashboard的key
  @observable onDragKey;  //  正在拖动的panel的key

  resizeType; //  缩放的方向,1为横向,2为纵向
  @observable onResizePanel;  //  正在缩放的panel
  @observable controllSize;  //  缩放控制条的宽高
  lastPosix = {}; //  记录移动前点击坐标位置还有目标元素长宽

  refreshPanel = action(() => {
    this.pKey = _.uniqueId("panel_");
  })

  setOnDragKey = action((key = "") => {
    this.onDragKey = key;
  })

  setOnResizePanel = action((panel) => {
    this.onResizePanel = panel;
  })

  setControllSize = action((size = {}) => {
    const { panelKey } = this.onResizePanel;
    let onResizeItem = this.panelMap.get(panelKey);
    onResizeItem.controllWidth = size.width;
    onResizeItem.controllHeight = size.height;
    this.panelMap.set(panelKey, onResizeItem);
  })

  /**
   * 拖动开始时，保存正在拖动的panel;
   */
  onDragStart = (panelKey) => {
    this.setOnDragKey(panelKey);
  }

  /**
   * 拖动结束
   */
  onDrop = () => {
    this.setOnDragKey();
    this.onStateChange();
  }

  /**
   * 拖动进某个panel时，重新设置order
   */
  onDragEnter = (target) => {
    if (this.onDragKey) {
      if (target === this.onDragKey) {
        return;
      }
      const targetOrder = this.panelMap.get(target).order;
      // 获取所有panel的order
      let orderList = [];
      this.panelMap.forEach((item) => {
        // 排除掉固定的
        if (!item.fixed) {
          orderList.push(item.order);
        }
      });
      // 去掉当前拖动的panel占用的order
      orderList.splice(orderList.findIndex((item) => { return item === targetOrder; }), 1);
      // 按从小到大排序，再分配个其他Panel
      orderList.sort((a, b) => { return a - b; });
      this.panelMap.forEach((item, key) => {
        if ((key !== this.onDragKey) && !item.fixed) {
          item.order = orderList[0];
          this.panelMap.set(key, item);
          orderList.shift();
        }
      });
      // 设置当前拖动的panel的order目标的order
      let onDragItem = this.panelMap.get(this.onDragKey);
      onDragItem.order = targetOrder;
      this.panelMap.set(this.onDragKey, onDragItem);
      this.refreshPanel();
    }
  }

  /**
   * 即将resize时执行，type为1表示横向缩放
   */
  panelWillResize = (panel, type) => {
    this.resizeType = type;
    this.setOnResizePanel(panel);
    const ele = findDOMNode(panel);
    const initialSize = {
      width: ele.offsetWidth,
      height: ele.offsetHeight
    };
    this.setControllSize(initialSize);
    document.addEventListener("mousemove", this.setResizeMouseMove);
    document.addEventListener("mouseup", this.setResizeMouseUp);
  }

  /**
   * resize时鼠标移动的事件
   */
  setResizeMouseMove = (e) => {
    e.preventDefault();
    if (!this.lastPosix.x) {
      const ele = findDOMNode(this.onResizePanel);
      this.lastPosix = {
        x: e.pageX,
        y: e.pageY,
        w: ele.offsetWidth,
        h: ele.offsetHeight
      };
    }
    if (this.resizeType === 1) {
      this.xResize();
    } else {
      this.yResize();
    }
  }

  setResizeMouseUp = () => {
    const ele = findDOMNode(this.onResizePanel);
    this.setControllSize({
      width: ele.offsetWidth,
      height: ele.offsetHeight
    });
    this.setOnResizePanel(null);
    this.lastPosix = {};
    this.onStateChange();
    // 将虚线框设置和container一样宽高
    document.removeEventListener("mousemove", this.setResizeMouseMove);
    document.removeEventListener("mouseup", this.setResizeMouseUp);
  }

  /**
   * 横向拉伸
   */
  xResize = () => {
    if (window.event.pageX > document.body.clientWidth) {
      console.log("out");
      return; // 超出网页不处理
    }
    // 计算宽度
    const distX = window.event.pageX - this.lastPosix.x; // 横向位移
    const realWidth = distX + this.lastPosix.w; // 实时宽
    // 计算步长
    const box = findDOMNode(this.dashboard);
    const { paddingLeft, paddingRight } = window.getComputedStyle(box);
    const { xStep, minWidth, maxWidth } = this.panelMap.get(this.onResizePanel.panelKey);
    let stageWidth = 1;
    // 可以是百分比和数字
    if (xStep > 0 && xStep < 1) {
      stageWidth = (parseFloat(box.clientWidth) - parseFloat(paddingLeft) - parseFloat(paddingRight)) * xStep;
    } else {
      stageWidth = xStep;
    }
    // 基准虚线框实时变化
    this.setControllSize({ width: realWidth });
    // 当位移大小超过标准值时，将使目标元素产生大小变化
    let multiple = 0;
    if (Math.abs(distX) >= stageWidth) {
      multiple = this.calcMultiple(distX, stageWidth); // 计算超过几倍标准值
    }
    let newWidth = this.lastPosix.w + multiple * stageWidth;
    // 最小宽度
    if (newWidth < minWidth) {
      newWidth = minWidth;
    }
    // 最大宽度
    if (newWidth > maxWidth) {
      newWidth = maxWidth;
    }
    const size = {
      width: newWidth,
      height: this.lastPosix.h
    };
    this.setOnResizePanelSize(size);
  }

  /**
   * 纵向拉伸
   */
  yResize = () => {
    if (window.event.pageY > document.body.clientHeight) {
      console.log("out");
      return; // 超出网页不处理
    }
    const distY = window.event.pageY - this.lastPosix.y; // 横向位移
    const realHeight = distY + this.lastPosix.h; // 实时高
    const { yStep: stageHeight, minHeight, maxHeight } = this.panelMap.get(this.onResizePanel.panelKey);
    // 基准虚线框实时变化
    this.setControllSize({ height: realHeight });
    // 当位移大小超过标准值时，将使目标元素产生大小变化
    let multiple = 0;
    if (Math.abs(distY) >= stageHeight) {
      multiple = this.calcMultiple(distY, stageHeight); // 计算超过几倍标准值
    }
    let newHeight = this.lastPosix.h + stageHeight * multiple;
    // 最小高度
    if (newHeight < minHeight) {
      newHeight = minHeight;
    }
    // 最大高度
    if (newHeight > maxHeight) {
      newHeight = maxHeight;
    }
    const size = {
      width: this.lastPosix.w,
      height: newHeight
    };
    this.setOnResizePanelSize(size);
  }

  setOnResizePanelSize = (size) => {
    const { panelKey } = this.onResizePanel;
    let onResizeItem = this.panelMap.get(panelKey);
    onResizeItem = { ...onResizeItem, ...size };
    this.panelMap.set(panelKey, onResizeItem);
    this.refreshPanel();
  }

  /**
   * 计算倍数
   * @param dividend 被除数
   * @param divisor  除数
   * @returns {*}
   */
  calcMultiple(dividend, divisor) {
    let multiple = null;
    if (dividend > 0) {
      multiple = Math.floor(dividend / divisor);
    } else {
      multiple = Math.ceil(dividend / divisor);
    }
    return multiple;
  }

  /**
   * 数据变化时，调用回调函数
   */
  onStateChange = () => {
    let list = [];
    this.panelMap.forEach((item) => {
      list.push({
        order: item.order,
        width: item.width,
        height: item.height
      });
    });
    if (this.callback) {
      this.callback(list);
    }
  }
}

export default Store;
