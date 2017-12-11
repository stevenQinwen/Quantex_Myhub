import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Chart } from 'components';
import styles from './index.scss';

export default class EngineDesign extends Component {
	
	
	
	

  makeOption = (data) => {
    return {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: "5%",
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: data.x,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: data.list
        }
      ]
    };
  }
  render() {
    return (
      <Row className={styles.root} gutter={20}>
        <Col span="10">
          <div className="shadow-box">
            <h3>性别划分</h3>
            
            
            
           < div className = 'tableauPlaceholder'>
           < object className = 'tableauViz'width = '100%'
   height = '450' >
     <param name = 'host_url' value = 'http%3A%2F%2F192.168.1.9%2F' / > 
   <param name = 'embed_code_version' value = '3' / > 
   <param name = 'site_root'
   value = '' / > <param name = 'name'
   value = '_1&#47;sheet0' / > <param name = 'tabs'
   value = 'no' / > 
   <param name = 'toolbar' value = 'no' / > 
   <param name = 'showAppBanner' value = 'false' /> 
   </object></div >
            
            
          </div>
        </Col>
        <Col span="14">
          <div className="shadow-box">
            <h3>年龄划分</h3>
            <div className='tableauPlaceholder'><object className='tableauViz' width='100%' height='450' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_1&#47;sheet1' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
            
            
            
          </div>
        </Col>
      </Row>
    );
  }
}



