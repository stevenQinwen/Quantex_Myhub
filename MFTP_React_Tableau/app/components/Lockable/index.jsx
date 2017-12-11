import React, { Component } from 'react';
import { Icon } from 'antd';
import Select from 'components/Select';
import InputNumber from 'components/InputNumber';
import InputGroup from 'components/InputGroup';
import styles from './index.scss';

const LockableWrapper = (lockableData) => {
  // 必填 for
  class Lockable extends Component {
    constructor(props) {
      super(props);
      lockableData[props.for] = false;
    }
    getComponent = (comp) => {
      // 高阶组件的属性(读取,增加,编辑,或移除comp传进来的props)
      const props = {
        disabled: this.isLock(),
        key: this.props.for
      };
      const compType = this.props.type;
      switch (compType) {
        case 'Select':
          return <Select {...comp.props} {...props} />;
        case 'InputNumber':
          return <InputNumber {...comp.props} {...props} />;
        case 'InputGroup':
          return <InputGroup {...comp.props } {...props } />;
        default:
          logger.error('invalid component<' + compType + '>');
          return null;
      }
    };
    toggleLock = () => {
      lockableData[this.props.for] = !this.isLock();
      this.forceUpdate();
    };
    isLock = () => {
      return !!lockableData[this.props.for]; // return false
    };
    render() {
      let comp = this.props.children; // Select, NumberFormat 组件
      // logger.info('comp:', comp);
      return (
        <div className={styles.root}>
          {
            this.getComponent(comp)
          }
          <Icon type={this.isLock() ? 'lock' : 'unlock'} onClick={this.toggleLock} />
        </div>
      );
    }
  }
  return Lockable;
};
export default LockableWrapper;
