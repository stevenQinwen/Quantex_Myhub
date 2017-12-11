import React, { Component } from 'react';
import Draggable from 'react-draggable';
import classnames from 'classnames';
import { Row, Icon } from 'antd';
import styles from './index.scss';

export default class Drag extends Component {
  render() {
    const { title, content, defaultPosition } = this.props;
    const cla = classnames({
      [styles.root]: true,
      "popover-plus-box": true
    });
    return (
      <Draggable bounds="body" handle=".popover-plus-title" defaultPosition={defaultPosition}>
        <div className={cla}>
          <Row className="popover-plus-title" type="flex" justify="space-between" align="middle">
            <div>{title}</div>
            <div>
              <Icon type="close" onClick={this.props.onClose} className="draggable-close-btn" />
            </div>
          </Row>
          <div className="popover-plus-content">
            {content}
          </div>
        </div>
      </Draggable>
    );
  }
}
