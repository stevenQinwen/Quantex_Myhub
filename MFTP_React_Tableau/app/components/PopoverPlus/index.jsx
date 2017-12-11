import React, { Component } from 'react';
import { Popover } from 'antd';
import ClickItem from './ClickItem';

export default class PopoverPlus extends Component {
  render() {
    const { children } = this.props;
    return (
      <Popover content={<ClickItem {...this.props} />}>
        {children}
      </Popover >
    );
  }
}
