import React, { Component } from 'react';
import { Row, Table ,Col,Tabs, Radio} from 'antd';
import { Select, DateTimeTranslate, NumberFormat, Chart } from 'components';
import { getDateList } from 'containers/page/common';
import styles from './index.scss';

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { DateTranslate } = DateTimeTranslate;
const { PercentFormat } = NumberFormat;

const dictData = [{
  id: "a",
  name: "申购金额",
}, {
  id: "b",
  name: "赎回金额",
}];

export default class EngineDesign extends Component {

  state={
  	type : "a"
  }

  makeOption = (data) => {
    return {
      tooltip: {
        trigger: "axis"
      },
      legend: {
        top: "bottom",
        data: ['预测', '实际']
      },
      xAxis: {
        data: getDateList("2017-3-6", "2017-3-15")
      },
      grid: {
        top: "10%",
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        name: '预测',
        type: 'line',
        data: data.preview
      }, {
        name: '实际',
        type: 'line',
        data: data.trueValue
      }]
    };
  }

  changeType = (e) => {
   this.setState({
   	type:e.target.value
   })
  }

  render() {
    const columns = [{
      title: "日期",
      dataIndex: "date"
    }, {
      title: "预测值",
      dataIndex: "preview",
      className: "text-right",
      render: (text) => {
        return <NumberFormat value={text} />;
      }
    }, {
      title: "实际值",
      dataIndex: "trueValue",
      className: "text-right",
      render: (text) => {
        return <NumberFormat value={text} />;
      }
    }, {
      title: "精度",
      dataIndex: "precision",
      className: "text-right",
      render: (text) => {
        return <PercentFormat value={text} />;
      }
    }];
    
    
    
    
    const dataSource = [{
      date: "03-06",
      preview: 84887286,
      trueValue: 112116912,
      precision: 0.09
    }, {
      date: "03-07",
      preview: 84887286,
      trueValue: 112116912,
      precision: 0.09
    }, {
      date: "03-08",
      preview: 84887286,
      trueValue: 112116912,
      precision: 0.09
    }, {
      date: "03-09",
      preview: 84887286,
      trueValue: 112116912,
      precision: 0.09
    }, {
      date: "03-10",
      preview: 84887286,
      trueValue: 112116912,
      precision: 0.09
    }, {
      date: "03-11",
      preview: 84887286,
      trueValue: 112116912,
      precision: 0.09
    }, {
      date: "03-12",
      preview: 84887286,
      trueValue: 112116912,
      precision: 0.09
    }, {
      date: "03-13",
      preview: 84887286,
      trueValue: 112116912,
      precision: 0.09
    }];
    let chart;
    let table;
    const {type}=this.state;
    switch (type){
    	case "a":
    		chart=<iframe src="http://192.168.1.9/views/_8/-?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>;
    		table=<iframe src="http://192.168.1.9/views/_7/-_7?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>;
    		break;
    	case "b":
    		chart=<iframe src="http://192.168.1.9/views/_8/-_1?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>;
    		table=<iframe src="http://192.168.1.9/views/_7/-_9?:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:toolbar=no"/>;
    		break;
    	default:
    		break;
    }
    return (
      <div className={`${styles.root} shadow-box`}>
        <Row type="flex" align="middle" justify="space-between" className="title-group m-b-10">
          <Row type="flex" align="middle" className="select-group">
            
            
             <RadioGroup defaultValue="a" onChange={this.changeType}>
                  <RadioButton value="a">申购</RadioButton>
                  <RadioButton value="b">赎回</RadioButton>
                </RadioGroup>
          </Row>
          
        </Row>
        <Row type="flex" className="performance-content" justify="space-between">
          <Col span="16">
           {chart}
          </Col>
           <Col span="7" offset="1">
          	{table}
          </Col>
        </Row>
      </div>
    );
  }
}
