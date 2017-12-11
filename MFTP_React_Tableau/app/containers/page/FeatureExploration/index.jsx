import React, { Component } from 'react';
import { Row, Col, Tabs, Radio } from 'antd';
import styles from './index.scss';

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class EngineDesign extends Component {
  state = {
    top: "a",
    bottom: "f",
    midle:'a'
  }
  
  changeTop = (e) => {
    this.setState({
      top: e.target.value
    });
  }
   changeMidle = (e) => {
    this.setState({
      midle: e.target.value
    });
  }
  
  changeBottom = (e) => {
    this.setState({
      bottom: e.target.value
    });
  }
  
  render() {
    const { top, bottom ,midle} = this.state;
    let sex1;
    let sex2;
    let age1;
    let age2;
    let trend1;
    let trend2;
    // 跟次数、金额、人均金额联动的两个框
    switch (top) {
      case "a":
        sex1 = (
<iframe className="chart-iframe"  src="http://192.168.1.9/views/_0/sheet0?:embed_code_version=3&:embed=y&:loadOrderID=0&:display_spinner=no&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
 					);
        sex2 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_0/sheet1?:embed=y&:display_count=no&:showAppBanner=false&:showVizHome=no&:toolbar=no"/>
        );
        break;
      case "b":
        sex1 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_0/sheet2?:embed=y&:display_count=no&:showAppBanner=false&:showVizHome=no&:toolbar=no"/>
      );
        sex2 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_0/sheet3?:embed=y&:display_count=no&:showAppBanner=false&:showVizHome=no&:toolbar=no"/>
        );
        break;
      
      default:
        break;
    }
    
    switch (midle) {
      case "a":
        age1 = (
<iframe className="chart-iframe"  src="http://192.168.1.9/views/_9/sheet0?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no" />
        );
        age2 = (
<iframe className="chart-iframe"  src="http://192.168.1.9/views/_9/sheet1?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no" />
        );
        break;
      case "b":
        age1 = (

<iframe className="chart-iframe" src="http://192.168.1.9/views/_3/sheet0?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        age2 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_3/sheet1?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        break;
      
        
      default:
        break;
    }
    
    
    // 申赎走势的两个框
    switch (bottom) {
    	 case "f":
        trend1 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_4/sheet0?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        trend2 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_4/sheet1?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        break;
    	
    	//沪深300
      case "a":
        trend1 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_5/300?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        trend2 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_5/300_1?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        break;
        //p2p
      case "b":
        trend1 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_5/p2p?:embed=y&:display_count=no&:showAppBanner=false&:showVizHome=no&:toolbar=no"/>
        );
        trend2 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_5/p2p_1?:embed=y&:display_count=no&:showAppBanner=false&:showVizHome=no&:toolbar=no"/>
        );
        break;
        //国债
      case "c":
        trend1 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_5/sheet4?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        trend2 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_5/sheet5?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        break;
        //上海同业拆放
      case "d":
        trend1 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_5/sheet6?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        trend2 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_5/sheet7?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        break;
      case "e":
      //银行间同业拆放
        trend1 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_5/sheet8?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        trend2 = (
<iframe className="chart-iframe" src="http://192.168.1.9/views/_5/sheet9?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>
        );
        break;
      default:
        break;
    }
    
    return (
      <div className={styles.root}>
        <div className="title">性别与申赎关系</div>
            <Row gutter={20}>
              <Col span="24">
                <RadioGroup defaultValue="a" onChange={this.changeTop}>
                  <RadioButton value="a">次数</RadioButton>
                  <RadioButton value="b">金额</RadioButton>
                </RadioGroup>
              </Col>
              <Col span="12">
                {sex1}
              </Col>
              <Col span="12">
                {sex2}
              </Col>
            </Row>
           
        <div className="title">年龄与申赎关系</div>
           <Row gutter={20}>
              <Col span="24">
                <RadioGroup defaultValue="a" onChange={this.changeMidle}>
                  <RadioButton value="a">次数</RadioButton>
                  <RadioButton value="b">金额</RadioButton>
                </RadioGroup>
              </Col>
              <Col span="12">
                {age1}
              </Col>
              <Col span="12">
                {age2}
              </Col>
            </Row>
         
        <div className="title">申赎与宏观因子</div>
        <div className="shadow-box">
          <RadioGroup defaultValue="f" onChange={this.changeBottom}>
            <RadioButton value="f">申赎走势</RadioButton>
            <RadioButton value="a">沪深300指数</RadioButton>
            <RadioButton value="b">P2P利率指数</RadioButton>
            <RadioButton value="c">国债换手率</RadioButton>
            <RadioButton value="d">上海银行间同业拆放利率</RadioButton>
            <RadioButton value="e">银行间同业拆借_bpchg日行情</RadioButton>
          </RadioGroup>
          <Row gutter={20} className="m-t-10">
            <Col span="12">
              {trend1}
            </Col>
            <Col span="12">
              {trend2}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}







