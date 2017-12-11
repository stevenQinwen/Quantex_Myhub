import React from 'react';
import { Translate, AutoEllipsis } from 'components';

class DemoComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>简单用法</h1>
        <code>
          {`<AutoEllipsis>我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>`}
        </code>
        <div style={{ width: '200px' }}>
          <AutoEllipsis>我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>
        </div>
        <h1>简单用法/默认宽度足够的情况下不显示Tooltip</h1>
        <code>
          {`<AutoEllipsis>我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>`}
        </code>
        <div>
          <AutoEllipsis>我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>
        </div>
        <h1>width</h1>
        <code>
          {`<AutoEllipsis width={200}>我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>`}
        </code>
        <div>
          <AutoEllipsis width={200}>我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>
        </div>
        <h1>content为翻译组件</h1>
        注意：如果不配置showTitle则在第一次渲染时会出现无法显示title的bug，建议与翻译组件组合使用时都加上showTitle
        <code>
          {`<AutoEllipsis showTitle="display"><Translate value="1,2,3" transUrl="/api/v2/roles/dict" multiple transKey="id_name"/></AutoEllipsis>`}
        </code>
        <div style={{ width: '100px' }}>
          <AutoEllipsis showTitle="display">
            <Translate value={'1,2,3'} transUrl="/api/v2/roles/dict" multiple transKey="id_name"/>
          </AutoEllipsis>
        </div>
      </div>
    );
  }
}

export default DemoComponent;
