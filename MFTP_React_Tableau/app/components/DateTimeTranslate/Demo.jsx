import React from 'react';
import DateTimeTranslate from './index';

const { DateTranslate, TimeTranslate } = DateTimeTranslate;

class DemoComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>默认格式化输出 YYYY-MM-DD HH:mm:ss</h1>
        <code>{`<DateTimeTranslate value="1493107244000"/>`}</code>
        <DateTimeTranslate value="1493107244000"/>
        <h1>指定格式输出 YYYY/MM/DD HH mm ss</h1>
        <code>{`<DateTimeTranslate value={1493107244000} format="YYYY/MM/DD HH mm ss"/>`}</code>
        <DateTimeTranslate value={1493107244000} format="YYYY/MM/DD HH mm ss"/>
        <h1>日期子组件/默认格式化日期/不可指定 YYYY-MM-DD</h1>
        <code>{`<DateTranslate value={1493107244000}/>`}</code>
        <DateTranslate value={1493107244000}/>
        <h1>时间子组件/默认格式化时间/不可指定 HH:mm:ss</h1>
        <code>{`<TimeTranslate value={1493107244000}/>`}</code>
        <TimeTranslate value={1493107244000}/>
      </div>
    );
  }
}

export default DemoComponent;
