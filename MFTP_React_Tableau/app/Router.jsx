import React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import Login from 'containers/Login';
import App from 'containers/Main';
import pageMap from 'containers/page/pagemap';

const pageMapList = [...pageMap.entries()]; // 获取所有页面的Map形式数组

class RootComponent extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Login} />
        <Route path="/page" component={App}>
          <IndexRedirect to="EngineDesign" />
          {pageMapList.map((item) => {
            return <Route key={item[0]} path={item[0]} component={item[1]} />;
          })}
        </Route>
      </Router>
    );
  }
}

export default RootComponent;
