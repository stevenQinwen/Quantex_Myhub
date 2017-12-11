import React from 'react';
import Translate from './index';

class DemoComponent extends React.Component {
  state = {
    change: false
  }
  forceUpdate = () => {
    this.setState({
      change: true
    });
  }
  render() {
    logger.log('render');
    const transData = [];
    for (let i = 1; i < 36; i++) {
      transData.push({
        id: i + '',
        name: 'xxx' + i.toString(36) + i
      });
    }
    return (
      <div style={{ height: '100%' }}>
        <h1>local transData/本地字典翻译需要加localUniqueId区分不同的字典数据</h1>
        <code>{`<Translate localUniqueId="simple" value={1} dictData={transData}/>`}</code>
        <Translate localUniqueId="simple" value={1} dictData={transData}/>
        <h1>使用translate翻译同时需要title(鼠标hover时展示全部文字),可添加配置项showTitle</h1>
        <code>{`<Translate showTitle={true} localUniqueId="simple" value={1} dictData={transData}/>`}</code>
        <Translate showTitle={true} localUniqueId="simple" value={1} dictData={transData}/>
        <h1>local transData/多个翻译/本地字典翻译需要加localUniqueId区分不同的字典数据</h1>
        <code>{`<Translate localUniqueId="multiple" value={'1,2'} multiple dictData={transData}/>`}</code>
        <Translate localUniqueId="multiple" value={'1,2'} multiple dictData={transData}/>
        <h1>remote transData/同一实例</h1>
        <code>{`<Translate transUrl="/api/v2/users/dict" transKey="id_name" value={1}/>`}</code>
        <Translate transUrl="/api/v2/users/dict" transKey="id_name" value={1}/>
        <h1>remote transData/多个翻译/同一实例</h1>
        <code>{`<Translate transUrl="/api/v2/users/dict" multiple transKey="id_name" value={'1,2'}/>`}</code>
        <Translate transUrl="/api/v2/users/dict" multiple transKey="id_name" value={'1,2'}/>
        <h1>remote transData/多个翻译/同一实例</h1>
        <code>{`<Translate transUrl="/api/v2/users/dict" multiple transKey="id_name" value={'1,2'}/>`}</code>
        <Translate transUrl="/api/v2/users/dict" multiple transKey="id_name" value={'1,2'}/>
        <h1>remote transData/多个翻译/同一实例/forceUpdate</h1><a onClick={this.forceUpdate}>forceUpdate</a>
        <code>{`<Translate transUrl="/api/v2/users/dict" transKey="id_name" value={'1'} forceUpdateTrans/>`}</code>
        <Translate transUrl="/api/v2/users/dict" transKey="id_name" value={'1'} forceUpdateTrans/>
      </div>
    );
  }
}

export default DemoComponent;
