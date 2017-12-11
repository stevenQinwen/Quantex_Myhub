import React from 'react';
import { Transfer } from 'antd';

import style from './index.scss';

class TransferComponent extends React.Component {
  state = {
    value: []
  }

  /**
   * 是否可控
   */
  isControll = () => {
    return this.props.value !== null && this.props.value !== undefined;
  };

  onChange = (value) => {
    if (this.props.onChange) this.props.onChange(value);
    if (!this.isControll()) this.setState({ value: value });
  };

  render() {
    return <Transfer
      showSearch
      className={style['transfer-component']}
      listStyle={{ height: 400 }}
      searchPlaceholder='请输入搜索内容'
      notFoundContent='列表为空'
      titles={['全选', '全选']}
      {...this.props}
      targetKeys={this.isControll() ? this.props.value : this.state.value}
      onChange={this.onChange}
    />;
  }
}

TransferComponent.propTypes = {
  // value: React.PropTypes.array, // targetKeys
  // 参见 antd Transfer props
};

export default TransferComponent;
