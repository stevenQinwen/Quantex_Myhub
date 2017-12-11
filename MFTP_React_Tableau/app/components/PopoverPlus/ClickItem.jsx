import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import ChartWindow from './ChartWindow';
import styles from './index.scss';

export default class ClickItem extends Component {
  handleClick = () => {
    const dom = findDOMNode(this.content);
    const { left: x, top: y } = dom.getBoundingClientRect();
    ChartWindow(this.props, { x, y });
  }
  render() {
    const { title, content } = this.props;
    return (
      <div onClick={this.handleClick} ref={(dom) => { this.content = dom; }} className={styles["popover-plus-hovere-block"]}>
        <h3 className="p-l-10 p-t-10 popover-plus-title">{title}</h3>
        {content}
      </div>
    );
  }
}
