import React, { Component } from 'react';
import { Row, Col, Tabs, Radio } from 'antd';
import styles from './index.scss';

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class EngineDesign extends Component {
  state = {
    top: "a",
    bottom: "b",
    midle:'c'
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
       <div className='tableauPlaceholder' ><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_0&#47;sheet0' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
 					);
        sex2 = (
          <div className='tableauPlaceholder' ><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_0&#47;sheet1' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        break;
      case "b":
        sex1 = (
        <div className='tableauPlaceholder' ><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_0&#47;sheet2' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
      );
        sex2 = (
        <div className='tableauPlaceholder' ><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_0&#47;sheet3' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        break;
      case "c":
        sex1 = (
<div className='tableauPlaceholder' ><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_2&#47;sheet0' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        sex2 = (
<div className='tableauPlaceholder' ><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_2&#47;sheet1' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        break;
      default:
        break;
    }
    
    switch (midle) {
      case "a":
        age1 = (
          <iframe className="chart-iframe"  src="http://192.168.1.9/views/_0/sheet0?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no"/>
        );
        age2 = (
          <iframe className="chart-iframe"  src="http://192.168.1.9/views/_0/sheet1?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no" />
        );
        break;
      case "b":
        age1 = (
<div className='tableauPlaceholder' ><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_3&#47;sheet0' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        age2 = (
<div className='tableauPlaceholder' ><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_3&#47;sheet1' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        break;
      case "c":
        age1 = (
          <iframe className="chart-iframe"  src="http://192.168.1.9/views/_0/sheet2?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no"/>
        );
        age2 = (
          <iframe className="chart-iframe"  src="http://192.168.1.9/views/_0/sheet3?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no"/>
        );
        break;
        
      default:
        break;
    }
    
    
    // 申赎走势的两个框
    switch (bottom) {
    	//沪深300
      case "a":
        trend1 = (
					<div className='tableauPlaceholder'><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_5&#47;300' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        trend2 = (
					<div className='tableauPlaceholder'><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_5&#47;300_1' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        break;
        //p2p
      case "b":
        trend1 = (
					<div className='tableauPlaceholder'><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_5&#47;p2p' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        trend2 = (
					<div className='tableauPlaceholder'><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_5&#47;p2p_1' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        break;
        //国债
      case "c":
        trend1 = (
					<div className='tableauPlaceholder'><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_5&#47;sheet4' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        trend2 = (
					<div className='tableauPlaceholder'><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_5&#47;sheet5' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        break;
        //上海同业拆放
      case "d":
        trend1 = (
					<div className='tableauPlaceholder'><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_5&#47;sheet6' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        trend2 = (
					<div className='tableauPlaceholder'><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_5&#47;sheet7' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        break;
      case "e":
      //银行间同业拆放
        trend1 = (
					<div className='tableauPlaceholder'><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_5&#47;sheet8' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
        );
        trend2 = (
					<div className='tableauPlaceholder'><object className='tableauViz' width='1280' height='539' ><param name='host_url' value='http%3A%2F%2F192.168.1.9%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='_5&#47;sheet9' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='showAppBanner' value='false' /></object></div>
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
                  <RadioButton value="c">人均金额</RadioButton>
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
                  <RadioButton value="c">人均金额</RadioButton>
                </RadioGroup>
              </Col>
              <Col span="12">
                {age1}
              </Col>
              <Col span="12">
                {age2}
              </Col>
            </Row>
         
        <div className="title">申赎走势</div>
        <div className="shadow-box">
          <RadioGroup defaultValue="a" onChange={this.changeBottom}>
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
