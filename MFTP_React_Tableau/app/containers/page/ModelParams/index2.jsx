import React, { Component } from 'react';
import { Row, Table ,Col} from 'antd';
import { Select, DateTimeTranslate, NumberFormat, Chart } from 'components';
import { getDateList } from 'containers/page/common';
import styles from './index.scss';


class History extends Component {
	costructor(){
		super()
		this.state={
			history:[]
		}
		
	}
	componentDidMount(){
		$.ajax({
			type:"get",
			url:"http://localhost:8080/mftp/showModelResult.action",
			async:true,
			success:function(e){
				console.log(e)
				this.setStart({
					history:e
				})
				alert(e)  
			}.bind(this)
			
		});
	}
	render(){
		return(
			<div>测试一下</div>
		)
	}
	
}
