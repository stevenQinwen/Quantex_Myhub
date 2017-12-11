import React from "react";
import Radio from "./index";

class DemoComponent extends React.Component {
  state = {
    value: undefined
  };

  render() {
    return (
      <div>
        <h1>基础展示</h1>
        <code>{`<Radio options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1" }]} />`}</code>
        <Radio options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1" }]} />
        <h1>基础展示 可控</h1>
        <code>{`<Radio value={this.state.value} onChange={(value) => { this.setState({ value: value }); }} options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1" }]} />`}</code>
        <Radio value={this.state.value} onChange={(value) => { this.setState({ value: value }); }} options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1" }]} />
        <h1>基础展示 默认值 禁用</h1>
        <code>{`<Radio defaultValue="1" options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1", disabled: true }]} />`}</code>
        <Radio defaultValue="1" options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1", disabled: true }]} />
        <h1>api 字典</h1>
        <code>{`<Radio dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />`}</code>
        <Radio dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
        <h1>api 禁用</h1>
        <code>{`<Radio disabled={(option) => { return option.id == "1"; }} dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />`}</code>
        <Radio disabled={(option) => { return option.id == "1"; }} dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
        <h1>api 全部禁用</h1>
        <code>{`<Radio defaultValue="1" disabled={(option) => { return option.id == "1"; }} dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />`}</code>
        <Radio defaultValue="1" disabled={(option) => { return option.id == "1"; }} dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
        <code>{`<Radio disabled={false} dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />`}</code>
        <Radio defaultValue="1" disabled={true} dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
        <h1>垂直显示</h1>
        <code>{`<Radio showCheckAll vertical dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />`}</code>
        <Radio showCheckAll vertical dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
      </div>
    );
  }
}

export default DemoComponent;
