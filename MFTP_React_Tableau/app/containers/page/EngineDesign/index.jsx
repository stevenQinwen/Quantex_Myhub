import React, { Component } from 'react';
import { Row } from 'antd';
import styles from './index.scss';

export default class EngineDesign extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Row className="img-box shadow-box" type="flex" align="middle" justify="space-around">
          <div className="img-1"><img src="images/数据收集_left.png" /></div>
          <div className="text-box">
            <div className="img-box-title">数据收集</div>
            <div className="short-line"></div>
            <p>将所有跟货基申赎相关的数据收集到一起</p>
          </div>
          <div className="img-2"><img src="images/数据收集_right.png" alt=""/></div>
        </Row>
        <Row className="img-box shadow-box" type="flex" align="middle" justify="space-around">
          <div className="img-1"><img src="images/数据处理_left.png" /></div>
          <div className="text-box">
            <div className="img-box-title">数据处理，特征工程</div>
            <div className="short-line"></div>
            <p>将零散的数据整理成</p>
            <p>规则、干净、可建模的数据表格</p>
          </div>
          <div className="img-2"><img src="images/数据处理_right.png" alt=""/></div>
        </Row>
        <Row className="img-box shadow-box" type="flex" align="middle" justify="space-around">
          <div className="img-1"><img src="images/模型建立_left.png" /></div>
          <div className="text-box">
            <div className="img-box-title">模型建立与调整</div>
            <div className="short-line"></div>
            <p>用多种方法建模预测，选取一种最有方案</p>
            <p>或者将几种方法和并达到最优的效果</p>
          </div>
          <div className="img-2"><img src="images/模型建立_right.png" alt=""/></div>
        </Row>
        <Row className="img-box shadow-box" type="flex" align="middle" justify="space-around">
          <div className="img-1"><img src="images/产品化部署_left.png" /></div>
          <div className="text-box">
            <div className="img-box-title">产品化部署</div>
            <div className="short-line"></div>
            <p>将数据和算法无缝连接到相关产品UI中</p>
            <p>方便业务人员调用</p>
          </div>
          <div className="img-2"><img src="images/产品化部署_right.png" alt=""/></div>
        </Row>
      </div>
    );
  }
}




