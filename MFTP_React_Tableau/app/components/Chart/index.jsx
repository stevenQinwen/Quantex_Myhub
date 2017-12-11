import React, { Component } from 'react';
import echarts from 'echarts';
import { Spin } from 'antd';
import EchartsForReact from 'echarts-for-react';
import { observer } from 'mobx-react';
import Store from './Store';
import styles from './index.scss';

@observer
class Chart extends Component {
  constructor(props) {
    super(props);
    this.store = new Store(props);
    this.store.fetchData();
  }

  /**
   * 重新获取数据
   */
  refreshChart = () => {
    this.store.fetchData();
  }

  render() {
    const { width = "100%", height = "100%" } = this.props;
    const { option, chartKey, loading } = this.store;
    return (
      <div
        style={{
          width,
          height,
        }}
        className={styles.root}
        >
        <Spin spinning={loading} wrapperClassName={styles.spin}>
          <EchartsForReact
            chartKey={chartKey}
            echarts={echarts}
            option={option}
            style={{
              width: "100%",
              height: "100%",
            }}
            {...this.props}
          />
        </Spin>
      </div >
    );
  }
}

export default Chart;
