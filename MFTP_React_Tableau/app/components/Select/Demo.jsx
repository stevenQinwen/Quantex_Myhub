import React from 'react';
import Select from 'components/Select';

class DemoComponent extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  state = {
    change: false
  }
  forceUpdate = () => {
    this.setState({
      change: true
    });
  }
  render() {
    const dictData = [];
    for (let i = 0; i < 36; i++) {
      dictData.push({
        id: i + '',
        name: 'xxx' + i.toString(36) + i
      });
    }
    return (
      <div className="content">
        <h1>不带搜索单选</h1>
        <code>{`<Select showSearch={false} dictData={dictData} style={{ width: '100%' }} />`}</code>
        <Select showSearch={false} dictData={dictData} style={{ width: '100%' }} />
        <h1>带搜索单选</h1>
        <code>{`<Select dictData={dictData} style={{ width: '100%' }} />`}</code>
        <Select dictData={dictData} style={{ width: '100%' }} />
        <h1>不清除已有value搜索单选</h1>
        <code>{`<Select mode="combobox" dictData={dictData} style={{ width: '100%' }} />`}</code>
        <Select mode="combobox" dictData={dictData} style={{ width: '100%' }} />
        <h1>带搜索多选</h1>
        <code>{`<Select mode="multiple" dictData={dictData} style={{ width: '100%' }} />`}</code>
        <Select mode="multiple" dictData={dictData} style={{ width: '100%' }} />
        <h1>支持disable/hidden</h1>
        <code>{`<Select disabledValues={['1', '2', '3']} hiddenValues={['4', '5', '6']} dictData={dictData} style={{ width: '100%' }} />`}</code>
        <Select disabledValues={['1', '2', '3']} hiddenValues={['4', '5', '6']} dictData={dictData} style={{ width: '100%' }} />
        <h1>从后台请求表数据</h1>
        <code>{`<Select dictUrl="/api/v2/users/dict" dictKey="id_name" style={{ width: '100%' }} />`}</code>
        <Select dictUrl="/api/v2/users/dict" dictKey="id_name" style={{ width: '100%' }} />
        <h1>从后台请求数据字典数据</h1>
        <code>{`<Select dictUrl="/api/v2/dictdatas/dict" dictKey="user_group_role" style={{ width: '100%' }} />`}</code>
        <Select dictUrl="/api/v2/dictdatas/dict" dictKey="user_group_role" style={{ width: '100%' }} />
        <h1>模糊搜索</h1>
        <code>{`<Select fuzzySearch={true} dictUrl="/api/v2/users/dict" dictKey="id_name" style={{ width: '100%' }} />`}</code>
        <Select fuzzySearch={true} dictUrl="/api/v2/users/dict" dictKey="id_name" style={{ width: '100%' }} />
        <h1>模糊搜索/多选模式下的模糊查询显示有问题,尽量不要用多选模式下的模糊查询</h1>
        <code>{`<Select mode="multiple" fuzzySearch={true} dictUrl="/api/v2/users/dict" dictKey="id_name" style={{ width: '100%' }} />`}</code>
        <Select mode="multiple" fuzzySearch={true} dictUrl="/api/v2/users/dict" dictKey="id_name" style={{ width: '100%' }} />
        <h1>ForceUpdate</h1><a onClick={this.forceUpdate}>forceUpdate</a>
        <code>{`<Select forceUpdateDict={true} dictUrl="/api/v2/users/dict" dictKey="id_name" style={{ width: '100%' }} />`}</code>
        <Select forceUpdateDict={true} dictUrl="/api/v2/users/dict" dictKey="id_name" style={{ width: '100%' }} />
        <h1>支持Int类型的传值/存在defaultValue配置为0</h1>
        <code>{`<Select defaultValue={0} dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select defaultValue={0} dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />
        <h1>支持Int类型的传值/存在defaultValue配置为0/存在value配置为1</h1>
        <code>{`<Select defaultValue={0} value={1} dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select defaultValue={0} value={1} dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />
        <h1>支持Int类型的传值/多选/存在defaultValue配置为[0,1,2]</h1>
        <code>{`<Select mode="multiple" defaultValue={[0, 1, 2]} dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select mode="multiple" defaultValue={[0, 1, 2]} dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />
        <h1>支持Int类型的传值/多选/存在defaultValue配置为[0,1,2]/存在value配置为[3, 4, 5]</h1>
        <code>{`<Select mode="multiple" defaultValue={[0, 1, 2]} value={[3, 4, 5]} dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select mode="multiple" defaultValue={[0, 1, 2]} value={[3, 4, 5]} dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />
        <h1>带搜索单选/本地默认选中第一项</h1>
        <code>{`<Select dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />
        <h1>带搜索单选/本地默认选中第一项/存在value配置</h1>
        <code>{`<Select value="2" dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select value="2" dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />
        <h1>带搜索单选/本地默认选中第一项/存在defaultValue配置</h1>
        <code>{`<Select defaultValue="3" dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select defaultValue="3" dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />
        <h1>带搜索单选/本地默认选中第一项/存在value/defaultValue配置</h1>
        <code>{`<Select value="2" defaultValue="2" dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select value="2" defaultValue="2" dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />
        <h1>从后台请求表数据/默认选中第一项</h1>
        <code>{`<Select dictUrl="/api/v2/users/dict" dictKey="id_name" defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select dictUrl="/api/v2/users/dict" dictKey="id_name" defaultSelectFirstOption style={{ width: '100%' }} />
        <h1>多选/默认选中第一项</h1>
        <code>{`<Select mode="multiple" dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select mode="multiple" dictData={dictData} defaultSelectFirstOption style={{ width: '100%' }} />
        <h1>模糊搜索/默认选中第一项/非combobox模式回车选中值时会引起为空的模糊查询,因为输入框被清空了</h1>
        <code>{`<Select fuzzySearch={true} dictUrl="/api/v2/users/dict" dictKey="id_name" defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select fuzzySearch={true} dictUrl="/api/v2/users/dict" dictKey="id_name" defaultSelectFirstOption style={{ width: '100%' }} />
        <h1>模糊搜索/默认选中第一项/combobox模式下不会回车不会清楚输入框二次模糊查询</h1>
        <code>{`<Select mode="combobox" fuzzySearch={true} dictUrl="/api/v2/users/dict" dictKey="id_name" defaultSelectFirstOption style={{ width: '100%' }} />`}</code>
        <Select mode="combobox" fuzzySearch={true} dictUrl="/api/v2/users/dict" dictKey="id_name" defaultSelectFirstOption style={{ width: '100%' }} />
      </div>
    );
  }
}

DemoComponent.defaultProps = {
};

export default DemoComponent;
