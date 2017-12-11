import React from 'react';
import Cascader from './index';

class DemoComponent extends React.Component {
  render() {
    const treeData = [
      {
        id: 0,
        pId: 0,
        name: '条件因子'
      }, {
        id: 1,
        pId: 1,
        name: '计算因子'
      }, {
        id: 2,
        pId: 2,
        name: '特殊因子'
      }, {
        id: '0_0',
        pId: 0,
        name: '持仓类'
      }, {
        id: '0_1',
        pId: 0,
        name: '规模类',
        disabled: true
      }, {
        id: '0_2',
        pId: 0,
        name: '资产类'
      }, {
        id: '0_3',
        pId: 0,
        name: '保证金类'
      }
    ];
    return (
      <div>
        <h1>基础展示</h1>
        <code>{`<Cascader treeData={treeData}/>`}</code>
        <Cascader treeData={treeData}/>
        <h1>静态数据 + defaultValue</h1>
        <code>{`<Cascader treeData={treeData} defaultValue={['0', '0_0']}/>`}</code>
        <Cascader treeData={treeData} defaultValue={['0', '0_0']}/>
        <h1>静态数据 + value(必须手动控制后续值的变化)</h1>
        <code>{`<Cascader treeData={treeData} value={['0', '0_0']}/>`}</code>
        <Cascader treeData={treeData} value={['0', '0_0']}/>
        <h1>静态数据 + disableValue</h1>
        <code>{`<Cascader treeData={treeData} disabledValues={['0_0']}/>`}</code>
        <Cascader treeData={treeData} disabledValues={['0_0']}/>
        <h1>动态数据</h1>
        <code>{`<Cascader treeUrl="/api/v2/menus/list"/>`}</code>
        <Cascader treeUrl="/api/v2/menus/list"/>
        <h1>动态数据 + 指定 site</h1>
        <code>{`<Cascader treeUrl="/api/v2/rulefactors/factortype/tree" treeSite="qcw"/>`}</code>
        <Cascader treeUrl="/api/v2/rulefactors/factortype/tree" treeSite="qcw"/>
      </div>
    );
  }
}

export default DemoComponent;
