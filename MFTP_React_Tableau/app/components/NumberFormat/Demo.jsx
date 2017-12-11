import React from 'react';
import NumberFormat from './index';

const { IntegerFormat, PercentFormat } = NumberFormat;

class DemoComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>NumberFormat 默认为显示类型/默认显示小数两位/默认千分位分割</h1>
        <code>{`<NumberFormat value={1234567}/>`}</code>
        <NumberFormat value={1234567}/>
        <h1>NumberFormat 默认为显示类型/默认显示小数两位/默认千分位分割</h1>
        <code>{`<NumberFormat value="1234567"/>`}</code>
        <NumberFormat value="1234567"/>
        <h1>指定前缀</h1>
        <code>{`<NumberFormat value={1234567.89} prefix="￥"/>`}</code>
        <NumberFormat value={123456.89} prefix="￥"/>
        <h1>指定后缀</h1>
        <code>{`<NumberFormat value={1234567.89} suffix="%"/>`}</code>
        <NumberFormat value={123456.89} suffix="%"/>
        <h1>IntegerFormat 整数显示类型的格式化子组件</h1>
        <code>{`<IntegerFomat value={1234567}/>`}</code>
        <IntegerFormat value={123456}/>
        <h1>PercentFormat 百分比显示类型的格式化子组件</h1>
        <code>{`<PercentFormat value="0.89"/>`}</code>
        <PercentFormat value="0.89"/>
      </div>
    );
  }
}

export default DemoComponent;
