import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import { msgCenter } from 'utils';

const styles = require('./index.scss');

const defaulConfig = {
  resizeDelay: 200, // 触发 resize 事件延时
  padColumnEnd: 50, // 预留每列表格头部追加的空白
  padTableBottom: 70, // 预留 table 下方的空白, padBottom include table-margin parent-padding bottom-height
};
/**
 const scrollConfig = {
  // 可选项：固定表头配置
  // 不传将默认 calcAuto 的方式来计算 scroll.y
  y: {
    // 可选项：表格y轴滚动值
    // 如果配置 value，取值方式将被忽略
    // 不配置 value，则将根据剩余属性自动计算
    value: <number>,
    // 可选项：取值方式
    // 'calcWithParent' 需配合父元素高度才能计算, 请提前设置好父元素的百分比高度
    // 'calcAuto' 将自动计算表元素距离页面底部距离再计算出 y 值
    getValueWay: 'calcAuto'(默认值) | 'calcWithParent',
    // 表格底部留白
    padBottom: 80(默认值<number>)，
  },
  // 可选项：表格横向配置
  x: {
    // 可选项：表格x轴滚动值
    // 不配置 value，则将根据剩余属性以及 columns 自动计算
    value: <number>,
    // 可选项：每列扩展宽
    // 覆盖内部每列设置的扩展宽，列设置了 width 时此属性无效
    // columns.width 为 0 or null 时该列会成为自适应列
    padEnd: 50(默认值<number>),
  }
 };
 */
class FixedTableComponent extends React.Component {

  triggerResize = _.debounce(() => { this.forceUpdate(); }, 200);

  componentDidMount() {
    this.bindEvent();
    this.forceUpdate(); // 获取到实例后直接触发更新计算scroll
  }

  componentWillUnmount() {
    // unbind resize when unmount
    window.removeEventListener("resize", this.triggerResize);
    // unsubscribe msgCenter
    msgCenter.unsubscribe(this.msgToken);
  }

  /**
   * 绑定事件：resize ...
   */
  bindEvent = () => {
    window.addEventListener("resize", this.triggerResize);
    // msgCenter subscribe
    this.msgToken = msgCenter.subscribe('fixed-table-resize', () => {
      // 如果表格不在当前页面内，高度为0
      if (this.getRootNode().getBoundingClientRect().height !== 0) {
        logger.log('fixed-table-resize');
        this.triggerResize();
      }
    });
  };

  /**
   * 获取组件实例的真实 Dom 节点
   */
  getRootNode = () => {
    return ReactDOM.findDOMNode(this);
  };

  /**
   * 根据配置以及 columns 来计算 scroll.x
   * @param config
   * @param columns
   * @returns {*}
   */
  calcScrollX = (config = {}, columns) => {
    const { value, padEnd } = config;
    if (value) return value;
    this.columnWidths = columns.map((column) => {
      const { title, width } = column;
      if (width) {
        return width;
      } else {
        return title.length * 12 + (padEnd || defaulConfig.padColumnEnd); // no width prop or width === null or width === 0
      }
    });
    return _.sum(this.columnWidths);
  };

  /**
   * 返回父节点的宽作为需要横向滚动的最小宽度
   * @returns {number}
   */
  calcScrollMinX = () => {
    return this.getRootNode().parentNode.clientWidth;
  };

  /**
   * 根据配置来计算 scroll.y
   * @param config = { value: 'xxx', getValueWay: 'xxx' }
   */
  calcScrollY = (config = {}) => {
    const { value, getValueWay, padBottom } = config;
    if (value) return value;
    switch (getValueWay) {
      case 'calcWithParent':
        return this.calcScrollYWithParent(padBottom);
      case 'calcAuto':
      default:
        return this.calcScrollYAuto(padBottom);
    }
  };

  /**
   * y.getValueWay = 'calcWithParent'，将根据父元素的百分比高度计算出 scroll.y
   * @param padBottom
   * @returns {number}
   */
  calcScrollYWithParent = (padBottom) => {
    const { clientHeight } = this.getRootNode().parentNode;
    const padTableBottom = _.isNumber(padBottom) ? padBottom : defaulConfig.padTableBottom;
    return clientHeight - padTableBottom;
  };

  /**
   * 默认计算表格左上角距离浏览器底部距离并减去定高做为 scroll.y
   * @param padBottom
   * @returns {number}
   */
  calcScrollYAuto = (padBottom) => {
    const { top } = this.getRootNode().getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const padTableBottom = _.isNumber(padBottom) ? padBottom : defaulConfig.padTableBottom;
    return windowHeight - top - padTableBottom;
  };

  /**
   * 生成 FixedTableProps
   * @param config
   * @param columns
   * @param className
   * @returns {{scroll: {y}, columns: Array}}
   */
  buildTableProps = (config = {}, columns = [], className) => {
    const scrollX = this.calcScrollX(config.x, columns);
    const scrollMinX = this.calcScrollMinX();
    const isNeedScrollX = scrollX > scrollMinX; // 是否需要滚动 x 轴
    const scroll = {
      y: this.calcScrollY(config.y)
    };
    if (isNeedScrollX) {
      scroll.x = scrollX;
    }
    const tableClass = classNames({
      [styles.root]: true,
      [styles[`empty-table-header-scroll`]]: isNeedScrollX // justify to add empty class when scroll-x need
    }, className);
    const newColumns = columns.map((column, index) => {
      const cloneColumn = _.clone(column); // 浅拷贝即可，并没有对存在引用关系的属性做修改
      if (!column.width) {
        // 所有没有传递宽度的 column 都会被赋予内部计算出来的一个宽度
        cloneColumn.width = this.columnWidths[index];
      }
      // 当页面宽度足以容纳所有行的时候不需要配置固定列，移除可以避免不必要的 bug
      if (!isNeedScrollX && column.fixed) {
        delete cloneColumn.fixed;
      }
      return cloneColumn;
    });
    return {
      className: tableClass,
      scroll,
      columns: newColumns
    };
  };

  render() {
    const { scroll, columns, className, ...originTableProps } = this.props; // remove scroll & columns & className from originTableProps
    const tableProps = this.getRootNode() ? this.buildTableProps(scroll, columns, className) : {}; // build after mount
    return (
      <Table size="small" {...originTableProps} {...tableProps}/>
    );
  }
}

FixedTableComponent.propTypes = {
  scroll: React.PropTypes.object
};

FixedTableComponent.defaultProps = {
  scroll: {}
};

export default FixedTableComponent;
