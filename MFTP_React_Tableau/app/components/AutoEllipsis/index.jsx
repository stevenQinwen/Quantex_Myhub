import React from 'react';
import ReactDOM from 'react-dom';
import { Tooltip } from 'antd';

const styles = require('./index.scss');

class AutoEllipsisComponent extends React.Component {

  containerStyle = {

  };
  state = {
    tooltipClassName: ''
  };

  componentDidMount() {
    this.checkEllipsis();
  }

  componentDidUpdate() {
    this.checkEllipsis();
  }

  getDomStyle = (dom) => {
    return document.defaultView.getComputedStyle(dom, null);
  };

  enableTooltip = () => {
    const { tooltipClassName } = this.state;
    if (tooltipClassName !== '') {
      this.setState({
        tooltipClassName: ''
      });
    }
  };

  disableTooltip = () => {
    const hiddenToolTipClassName = 'ellipsis-tooltip-hidden';
    const { tooltipClassName } = this.state;
    if (tooltipClassName !== hiddenToolTipClassName) {
      this.setState({
        tooltipClassName: hiddenToolTipClassName
      });
    }
  };

  checkEllipsis = () => {
    const container = ReactDOM.findDOMNode(this).firstChild;
    container.style.whiteSpace = 'inherit'; // 恢复换行，用于计算
    // size
    let { height: totalHeight, lineHeight } = this.getDomStyle(container);
    totalHeight = parseFloat(totalHeight);
    lineHeight = parseFloat(lineHeight);
    // other
    const { showTitle } = this.props;
    const row = Math.round(totalHeight / lineHeight); // 内容行数

    container.style.whiteSpace = 'nowrap'; // 计算结束，恢复不换行

    // showTitle
    switch (showTitle) {
      case 'display':
        this.enableTooltip();
        break;
      case 'hidden':
        this.disableTooltip();
        break;
      case 'auto':
      default:
        if (row > 1) {
          this.enableTooltip();
        } else {
          this.disableTooltip();
        }
    }
  };

  render() {
    let { width, style = {}, children } = this.props;
    const { tooltipClassName } = this.state;
    const tooltipProps = {
      overlayClassName: tooltipClassName,
      title: children,
      mouseEnterDelay: 1
    };
    if (!isNaN(width)) {
      style = Object.assign({
        width: `${width}px`
      }, style);
    }
    return (
      <Tooltip {...tooltipProps}>
        <div className={styles.root} style={style}>
          <div>
            {children}
          </div>
        </div>
      </Tooltip>
    );
  }
}

AutoEllipsisComponent.propTypes = {
  width: React.PropTypes.number,
  showTitle: React.PropTypes.string,
};
AutoEllipsisComponent.defaultProps = {
  // auto: 默认，当出现省略时，显示 title，否则不用显示 title
  // hidden: 不显示 title，即使出现省略
  // display: 不管有没出现省略，都显示 title
  showTitle: 'auto', // auto|hidden|display
  row: 1,
};

export default AutoEllipsisComponent;
