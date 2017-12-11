import React from 'react';
import { Icon } from 'antd';
import eventCenter from 'utils/EventCenter';
import Store from './Store';

const styles = require('./index.scss');

const buildTransform = (duration) => {
  return 'transform ' + duration + 'ms cubic-bezier(0, 1, 0.85, 1)';
};

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideBar';
    this.state = {
      _transform: 'translateX(110%)', // 设置为110% 避免右侧sidebar左侧边框阴影显示在界面上
      _panelTranslateTo: 0, // 'push'模式下 panel 移动的距离
      _transition: '',
      opened: props.opened,
      sShowVeil: false // 是否展示遮罩层
    };
  }

  componentDidMount() {
    if (this.props.side === 'left') {
      this.setState({
        _transform: 'translateX(-100%)'
      });
      // 初始化订阅左侧菜单栏折叠、展开事件
      this.initEvent();
    }
    // 获取左侧菜单栏的 DOM
    this.aside = document.getElementById('js-layout-aside');
  }

  componentWillReceiveProps(nextProps = {}) {
    // logger.log("进入componentWillReceiveProps方法 :", nextProps);
    if (nextProps.hasOwnProperty('opened')) {
      if (nextProps.opened === true) {
        this.open(nextProps);
      } else {
        this.close(nextProps);
      }
    }
  }

  componentWillUnmount() {
    eventCenter.unsubscribe(this.topic);
  }
  // 定于左侧菜单展开、关闭事件
  initEvent = () => {
    this.topic = eventCenter.subscribe('menu-collapse', () => {
      if (this.isOpen()) { // 若当前 sidebar 处于展开状态 同时展示在左侧
        const distance = this.props.width + this.aside.clientWidth; // sibar宽度 + 左侧菜单宽度
        this.setState({
          _transform: `translateX(${distance}px)`
        });
      }
    });
  };

  close = (props = this.props) => {
    const { side, showVeil, width } = props;
    if (!this.isOpen()) return;

    this.setTransition(props);

    showVeil && this.setState({ sShowVeil: false });

    if (side === 'right') {
      this.setState({
        _transform: 'translateX(110%)',
        _panelTranslateTo: 0
      });
    } else {
      let distance; // 需要移动距离
      if (this.aside) { // 左侧菜单宽度 + sidebar 本身宽度
        distance = -(this.aside.clientWidth + width);
      } else {
        distance = -width;
      }
      this.setState({
        _transform: `translateX(${distance}px)`,
        _panelTranslateTo: 0
      });
    }

    this.setState({
      opened: false
    });

    window.setTimeout(() => {
      this.setState({
        _transition: '',
      });
    }, props.duration + 50);
  }

  // 关闭弹框
  handleClose = () => {
    this.close();
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  isOpen = () => {
    return this.state.opened;
  }

  open = (props = this.props) => {
    const { width, side, showVeil } = props;
    this.setTransition(props);
    showVeil && this.setState({ sShowVeil: true });
    if (side === 'right') {
      this.setState({
        _panelTranslateTo: `-${width}px`,
        _transform: 'translateX(0%)'
      });
    } else {
      let distance; // 需要移动距离
      if (this.aside) { // 若有左侧菜单栏
        distance = this.aside.clientWidth + width;
      } else {
        distance = 0;
      }
      this.setState({
        _panelTranslateTo: `${width}px`,
        _transform: `translateX(${distance}px)`
      });
    }

    this.setState({
      opened: true
    });

    window.setTimeout(() => {
      this.setState({
        _transition: '',
      });
    }, this.props.duration + 50); // 当过度效果即sideBar展开动作完成后清空transition属性值
  }

  // 设置过度效果
  setTransition = (props = this.props) => {
    this.setState({
      _transition: buildTransform(props.duration)
    });
  }

  render() {
    const { children, bar, mode, side, width, topBar, closeBtn, title, reserveBarWhenClose } = this.props;
    const { _transition, _transform, _panelTranslateTo, sShowVeil } = this.state;
    const barStyle = {
      width: width,
      transition: _transition,
      zIndex: 2,
      transform: _transform
    };

    if (side === 'left') {
      if (this.aside) { // 如果有左侧菜单栏, 则将sidebar完全隐藏
        barStyle.left = -width;
      } else {
        barStyle.left = 0;
      }
      barStyle.borderLeft = 0;
    } else {
      Object.assign(barStyle, {
        right: 0,
        borderRight: 0
      });
    }

    const panelStyle = {};
    const wrapperStyle = {};

    if (mode !== 'over') {
      Object.assign(panelStyle, {
        transition: _transition,
        transform: `translateX(${_panelTranslateTo})`
      });
    }

    // 当sidebar展开时, 设置 sidebar 容器为overflow:hidden, 避免滚动鼠标时,滚动界面内容
    if (this.isOpen()) {
      panelStyle.overflow = 'hidden';
      wrapperStyle.overflow = 'hidden';
    }

    // Build props for bar
    const contentProps = {
      className: styles['side-bar-content']
    };

    // Build props for bar
    const barProps = {
      className: styles['side-bar'] + ' side-bar',
      style: barStyle
    };

    // Build props for panel
    const panelProps = {
      className: styles['side-bar-panel'],
      style: panelStyle
    };
    // Build props for close button
    const closeBtnProps = {
      className: styles['side-bar-close-bar'],
      onClick: this.handleClose
    };
    // Build props for veil
    const veilProps = {
      className: styles['side-bar-veil'],
      onClick: this.handleClose
    };

    // Build props for wrapper
    const wrapperProps = {
      ref: ((comp) => { this._wrapper = comp; }),
      style: wrapperStyle,
      className: `qx-sidebar-${this.props.side} ${this.props.className}`
    };

    return (
      <div {...wrapperProps}>
        {topBar && <div>{topBar}</div>}
        {sShowVeil && <div {...veilProps} />}
        <div {...contentProps}>
          <div {...barProps}>
            <header>
              <span>{closeBtn && <Icon type="close" {...closeBtnProps} />}</span>
              <span className={styles.title}>{title}</span>
            </header>
            <div>
              {/* 如果reserveBarWhenClose为true，表示关闭时不销毁bar的内容,否则关闭时销毁bar */}
              {reserveBarWhenClose ?
                bar
                :
                (this.isOpen() ? bar : null)
              }
            </div>
          </div>
          <div {...panelProps}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]), // 主内容区内容
  bar: React.PropTypes.element, // sideBar内容
  topBar: React.PropTypes.any, // 顶栏内容
  opened: React.PropTypes.bool,
  width: React.PropTypes.number, // 弹框宽度
  side: React.PropTypes.string, // 弹框靠边方向: left, right
  title: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]), // 标题
  mode: React.PropTypes.string, // 弹框模式: push, over
  closeBtn: React.PropTypes.bool, // 是否展示关闭按钮
  showVeil: React.PropTypes.bool, // 是否展示遮罩
  onClose: React.PropTypes.func,
  onOpen: React.PropTypes.func,
  duration: React.PropTypes.number,
  reserveBarWhenClose: React.PropTypes.bool
};

SideBar.defaultProps = {
  opened: false,
  width: 332,
  side: 'right',
  title: '添加',
  mode: 'over',
  closeBtn: true,
  showVeil: true, // 遮罩
  duration: 150, // 过度时间
  className: '',
  reserveBarWhenClose: false  //  关闭时是否保留bar
};

SideBar.Store = Store;
export default SideBar;
