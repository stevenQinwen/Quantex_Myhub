import React from 'react';
import { findDOMNode } from 'react-dom';
import { Icon } from 'antd';
import { msgCenter } from 'utils';
import styles from './index.scss';

// 可收缩视图
class ExpandableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
  }

  componentDidMount() {
    // 获取传入组件的高度, 便于添加过度效果(上/下推的效果)
    this.firstChildHeight = findDOMNode(this).firstChild.getBoundingClientRect().height;
  }

  toggleAction = () => {
    const { collapse } = this.state;
    this.setState({
      collapse: !collapse
    }, () => {
      // when animate finish recalc fixedtable
      setTimeout(() => {
        msgCenter.publish('fixed-table-resize');
      }, 1000);
    });
  };

  render() {
    const { children, collapseTitle } = this.props;
    const { collapse } = this.state;
    // 传入组件的高度
    const firstChildStyle = {
      height: !collapse ? this.firstChildHeight : 0
    };
    return (
      <div className={styles['expandable-view']}>
        <div className={collapse ? styles.hidden : styles.show} style={firstChildStyle}>
          {
            children
          }
        </div>
        {
          collapse ? collapseTitle : null
        }
        <div className={styles.action} onClick={this.toggleAction}>
          {
            collapse ? <Icon type="caret-down" /> : <Icon type="caret-up" />
          }
        </div>
      </div>
    );
  }
}

ExpandableView.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]), // 展示内容
  collapseTitle: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]), // 折叠后显示内容
};

ExpandableView.defaultProps = {
  collapseTitle: '折叠后显示标题'
};

export default ExpandableView;
