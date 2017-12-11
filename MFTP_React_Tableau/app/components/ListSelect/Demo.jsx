import React from 'react';
import ListSelect from './index';

class DemoComponent extends React.Component {
  state = {
  }
  render() {
    const listData = [];
    for (let i = 1; i < 36; i++) {
      listData.push({
        id: i + '',
        name: 'xxx' + i.toString(36) + i
      });
    }
    return (
      <div style={{ height: '100%' }}>
        <h1>local data</h1>
        <code>{`<ListSelect listData={listData}/>`}</code>
        <ListSelect listData={listData}/>
        <h1>remote data</h1>
        <code>{`<ListSelect listUrl="/api/v2/users/dict" listKey="id_name"/>`}</code>
        <ListSelect listUrl="/api/v2/users/dict" listKey="id_name"/>
      </div>
    );
  }
}

export default DemoComponent;
