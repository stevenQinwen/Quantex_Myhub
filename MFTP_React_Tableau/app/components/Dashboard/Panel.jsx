import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react';
import classnames from 'classnames';

@observer
class Panel extends Component {
  cacheOrder; //  缓存的order，为了判断是否正在改变位置，如果正在改变且不是原来的位置，则变黑
  panelKey = _.uniqueId("panelKey_");
  state = {
    draggable: false,
  }
  getChildContext() {
    return {
      panelKey: this.panelKey,
      changeDraggable: this.changeDraggable,
      dragDisabled: this.props.dragDisabled || this.props.fixed,
    };
  }
  componentWillMount() {
    const { panelMap } = this.context.dStore;
    const { xStep = 1 / 12, yStep = 50, defaultOrder = panelMap.size + 1, fixed, defaultWidth: width, defaultHeight: height, minWidth = 0, minHeight = 0, maxWidth = 2000, maxHeight = 2000 } = this.props;
    const panelItem = {
      order: defaultOrder,
      xStep,
      yStep,
      fixed,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    };
    this.cacheOrder = panelMap.size + 1;
    panelMap.set(this.panelKey, panelItem);
  }

  /**
   * 改变可拖拽状态
   * 如果鼠标移入Header中，则设置成可拖拽，移出设置成false
   */
  changeDraggable = (state) => {
    this.setState({
      draggable: state
    });
  }

  dragStart = () => {
    this.context.dStore.onDragStart(this.panelKey);
  }
  dragEnter = () => {
    const { fixed } = this.props;
    if (!fixed) {
      const { dStore } = this.context;
      let { onDragEnter, panelMap, onDragKey } = dStore;
      // TODO  ->  延迟暂时有个小bug,cacheOrder错误，会让Panel刚拖动就变黑
      if (onDragKey) {
        if (dStore.timer) {
          dStore.timer = clearTimeout(dStore.timer);
        }
        dStore.timer = setTimeout(() => {
          onDragEnter(this.panelKey);
          this.cacheOrder = panelMap.get(this.panelKey).order;
        }, 200);
      }
    }
  }
  dragStop = () => {
    this.context.dStore.onDrop();
  }
  render() {
    const { children, className, xDisabled, yDisabled, dragDisabled, fixed } = this.props;
    const { draggable } = this.state;
    const { pKey, onDragKey, panelMap, panelWillResize, onResizePanel } = this.context.dStore;
    const { order, width, height, controllWidth, controllHeight } = panelMap.get(this.panelKey);
    const rootClass = classnames({
      "panel-of-dashboard": true,
      [className]: className,
      "panel-on-move": (onDragKey == this.panelKey) && (order !== this.cacheOrder) //  如果当前Panel正在拖动，且拖到了其他位置，则变黑
    });
    const xCla = classnames({
      "panel-x-controller": !xDisabled,
    });
    const yCla = classnames({
      "panel-y-controller": !yDisabled,
    });
    const controllerContainerCla = classnames({
      "panel-controller-container": true,
      "panel-on-resize": onResizePanel && (onResizePanel.panelKey === this.panelKey)
    });
    return (
      <div
        className={rootClass}
        style={{ order, width, height }}
        draggable={draggable && !dragDisabled && !fixed}
        onDragStart={this.dragStart}
        onDragEnter={this.dragEnter}
        onDragEnd={this.dragStop}
        name={pKey}
      >
        {children}
        <div className={controllerContainerCla} style={{ width: controllWidth, height: controllHeight }}>
          <div className={xCla} onMouseDown={() => { panelWillResize(this, 1); }}></div>
          <div className={yCla} onMouseDown={() => { panelWillResize(this, 2); }}></div>
        </div>
      </div>
    );
  }
}

Panel.contextTypes = {
  dStore: PropTypes.object,
};

Panel.childContextTypes = {
  panelKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  changeDraggable: PropTypes.func,
  dragDisabled: PropTypes.bool,
};

export default Panel;
