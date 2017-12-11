import React from "react";
import { CheckboxGroup } from "components";

class DemoComponent extends React.Component {
  state = {
    values: undefined,
    options: [{ name: "禁用", id: "0" }, { name: "启用", id: "1" }]
  };

  render() {
    return (
      <div>
        <h1>基础展示</h1>
        <code>{`<CheckboxGroup options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1" }]} />`}</code>
        <CheckboxGroup options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1" }]} />
        <h1>基础展示 可控</h1>
        <code>{`<CheckboxGroup value={this.state.values} onChange={(values) => { this.setState({ values: values }); }} options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1" }]} />`}</code>
        <CheckboxGroup value={this.state.values} onChange={(values) => { this.setState({ values: values }); }} options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1" }]} />
        <h1>基础展示 默认值 禁用</h1>
        <code>{`<CheckboxGroup defaultValue={["1"]} options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1", disabled: true }]} />`}</code>
        <CheckboxGroup defaultValue={["1"]} options={[{ name: "禁用", id: "0" }, { name: "启用", id: "1", disabled: true }]} />
        <h1>api 字典</h1>
        <code>{`<CheckboxGroup dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />`}</code>
        <CheckboxGroup dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
        <h1>全选按钮</h1>
        <code>{`<CheckboxGroup showCheckAll dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />`}</code>
        <CheckboxGroup showCheckAll dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
        <h1>api 禁用</h1>
        <code>{`<CheckboxGroup showCheckAll disabled={(option) => { return option.id == "1"; }} dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />`}</code>
        <CheckboxGroup showCheckAll disabled={(option) => { return option.id == "1"; }} dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
        <h1>全部禁用</h1>
        <code>{`<CheckboxGroup showCheckAll disabled={true} dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />`}</code>
        <CheckboxGroup showCheckAll disabled={true} dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
        <h1>垂直显示</h1>
        <code>{`<CheckboxGroup showCheckAll vertical dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />`}</code>
        <CheckboxGroup showCheckAll vertical dictUrl='/api/v2/dictdatas/dict' dictKey='user_enable' />
      </div>
    );
  }
}

export default DemoComponent;
