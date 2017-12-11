import React, { Component } from 'react';
import { Row, Table ,Col} from 'antd';
import { Select, DateTimeTranslate, NumberFormat, Chart } from 'components';
import { getDateList } from 'containers/page/common';
import { API } from 'utils';
import styles from './index.scss';


export default class History extends Component {
	api=new API("pas")
	constructor(){
		super()
		this.state={
			history:[]
		}
		
	}
	
	componentDidMount(){
		this.api.get("/showModelResult",{id:1})
		  .then((res)=>{
		  	window.alert(res);
		  })
	}
	render(){
		return(
			<div>测试一下</div>
		)
	}
}






