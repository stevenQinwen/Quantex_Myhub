import React, { Component } from 'react';
import { DatePicker } from 'antd';

export default class DatePickerComponent extends Component {
  state = {
    open: false
  }
  handleEnter = (event) => {
    // 回车关闭
    if (event.keyCode === 13) {
      this.handleOpenChange(false);
    }
  }
  handleOpenChange = (open) => {
    if (open) {
      document.addEventListener("keypress", this.handleEnter);
    } else {
      document.removeEventListener("keypress", this.handleEnter);
    }
    this.setState({
      open
    });
  }
  render() {
    const { open } = this.state;
    return (
      <DatePicker {...this.props} onOpenChange={this.handleOpenChange} open={open} />
    );
  }
}
