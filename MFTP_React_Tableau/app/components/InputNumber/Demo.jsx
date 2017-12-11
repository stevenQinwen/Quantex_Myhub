import React from 'react';
import InputNumberComponent from './index';

const { PercentNumber, TenThousandNumber } = InputNumberComponent;

class DemoComponent extends React.Component {
  state = {
    per_100_value: 0.0909,
    per_100_max_2_min_1_value: '1',
    per_1000_value: '',
    ten_10000_value: '',
    ten_10000_prec_4_value: '',
    ten_100_value: '',
    ten_01_value: ''
  };

  render() {
    return <div style={{ height: '100%' }}>
      <h1>普通展示</h1>
      <InputNumberComponent />
      <h1>普通展示 百分位</h1>
      value - {this.state.per_100_value}
      <PercentNumber
        value={this.state.per_100_value}
        onChange={(value) => { this.setState({ per_100_value: value }); }}
      />
      <h1>普通展示 百分位 最大值2 最小值1</h1>
      value - {this.state.per_100_max_2_min_1_value}
      <PercentNumber
        value={this.state.per_100_max_2_min_1_value}
        onChange={(value) => { this.setState({ per_100_max_2_min_1_value: value }); }}
        max={2}
        min={1}
      />
      <h1>普通展示 万元框</h1>
      value - {this.state.ten_10000_value}
      <TenThousandNumber
        value={this.state.ten_10000_value}
        onChange={(value) => { this.setState({ ten_10000_value: value }); }}
      />
      <h1>普通展示 万元框 4小数位验证</h1>
      value - {this.state.ten_10000_prec_4_value}
      <TenThousandNumber
        value={this.state.ten_10000_prec_4_value}
        onChange={(value) => { this.setState({ ten_10000_prec_4_value: value }); }}
        precision={4}
      />
      <h1>千分位框 - step 表示 千分之 0.01</h1>
      value - {this.state.per_1000_value}
      <InputNumberComponent
        value={this.state.per_1000_value}
        onChange={(value) => { this.setState({ per_1000_value: value }); }}
        addonAfter='‰'
        scale={0.001}
        step={0.00001}
      />
      <h1>百元框 - step 表示 1 元</h1>
      value - {this.state.ten_100_value}
      <InputNumberComponent
        value={this.state.ten_100_value}
        onChange={(value) => { this.setState({ ten_100_value: value }); }}
        addonAfter='百'
        precision={4}
        scale={100}
        step={1}
      />
      <h1>分框</h1>
      value - {this.state.ten_01_value}
      <InputNumberComponent
        value={this.state.ten_01_value}
        onChange={(value) => { this.setState({ ten_01_value: value }); }}
        addonAfter='分'
        precision={0}
        scale={0.01}
        step={0.01}
      />
    </div>;
  }
}

export default DemoComponent;
