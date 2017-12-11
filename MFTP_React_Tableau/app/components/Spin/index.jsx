import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';

require('./index.scss');

class SpinComponent {
  constructor(key) {
    this.count = 0;
    this.key = key;
  }
  showLoading() {
    this.count++;
    if (this.count == 1) {
      this._mountSpin();
    }
  }
  hideLoading() {
    this.count--;
    if (this.count == 0) {
      this._unmountSpin();
    }
  }
  _mountSpin() {
    this.spinParentContainer = document.getElementById(this.key) || document.body;
    this.spinContainer = document.createElement('spin');
    this.spinContainer.className = 'spin-container';
    this.spinParentContainer.appendChild(this.spinContainer);
    ReactDOM.render(<Spin size="large"/>, this.spinContainer);
  }
  _unmountSpin() {
    if (this.spinContainer) {
      ReactDOM.unmountComponentAtNode(this.spinContainer);
      this.spinParentContainer.removeChild(this.spinContainer);
      this.spinContainer = undefined;
    }
  }
  static getInstance(key = '') {
    let instances = SpinComponent.instances;
    let instance = instances.get(key);
    if (!instance) {
      instance = new SpinComponent(key);
      instances.set(key, instance);
    }
    return instance;
  }
  static removeInstance(key = '') {
    SpinComponent.instances.delete(key);
  }
}

SpinComponent.instances = new Map();

export default SpinComponent;
