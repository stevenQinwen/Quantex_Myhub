import React, { Component } from 'react';
import { Dashboard } from 'components';
import './demo.scss';

const { Panel, Header } = Dashboard;

class Test extends Component {
  onChange = (value) => {
    console.log(value);
  }
  render() {
    return (
      <div>
        <Dashboard className="dashboard">
          <Panel className="panel" xDisabled order={3}>
            <Header>111111</Header>
            abc
          </Panel>
          <Panel className="panel" yDisabled order={2}>
            <Header>2222222</Header>
            abc
          </Panel>
          <Panel className="panel" order={1} minWidth={250}>
            <Header>3333333333333</Header>
            abc
          </Panel>
          <Panel className="panel" order={0} yStep={1} minHeight={100} maxHeight={200}>
            <Header>4444444444444</Header>
            abc
          </Panel>
        </Dashboard>
      </div>
    );
  }
}

export default Test;

