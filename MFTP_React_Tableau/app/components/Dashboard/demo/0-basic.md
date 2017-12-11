---
order: 0
title: 基本使用
---

基本用法。

```jsx
import { Dashboard } from 'components';

class Test extends Component {
  onChange = (value) => {
    console.log(value);
  }
  render() {
    return (
      <div>
        <Dashboard className="dashboard" onChange={this.onChange}>
          <Panel className="panel" xDisabled order={3}>
            <Header>111111</Header>
            abc
          </Panel>
          <Panel className="panel" yDisabled order={2}>
            <Header>2222222</Header>
            abc
          </Panel>
          <Panel className="panel" order={1} fixed>
            <Header>3333333333333</Header>
            abc
          </Panel>
          <Panel className="panel" order={4} dragDisabled>
            <Header>4444444444444</Header>
            abc
          </Panel>
          <Panel className="panel" order={5} xStep={10} maxWidth={400} minWidth={300}>
            <Header>55555555555555</Header>
            abc
          </Panel>
        </Dashboard>
      </div>
    );
  }
}

ReactDOM.render(
  <Test/>
, mountNode);
```

````css
.dashboard{
  background:#f9f9f9;
  border:3px solid #666;
  padding:6px;
}
.panel{
  width:350px;
  height:50px;
  margin:15px;
  padding:5px;
  background: #fff;
  border:1px solid #666
}
````