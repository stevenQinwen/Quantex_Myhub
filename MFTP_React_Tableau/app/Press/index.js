import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router , HashRouter , Match , Route , Link ,IndexLink } from 'react-router-dom';
import $ from 'jquery';
import createHistory from 'history/createBrowserHistory';
import './Press.css';
import './common.css';
import conf from './Config';

class Press extends Component {
  constructor(){
    super()
    this.state={
      press: []
    }
  }
  componentDidMount(){
    $.ajax({
      url: conf.url+conf.port+'/press/press',
      type: 'GET',
      success: function(e){
        console.log(e);
        this.setState({
          press:e
        })
      }.bind(this)
   })
  }
  render() {
    return (
      <div className="press">
        <div className="wrap">
          <h3>新闻稿</h3>
          <div className="news">
            {this.state.press.map(function(e){
              return e.contact?<p>{e.contact}</p>:''
            })}
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <ul>
              {this.state.press.map(function(e){
                return <li className="clear">
                <div className="news_text left">
                  <div>
                    <h4 className="news_date">{e.time}</h4>
                    <h4  className="news_title">
                      <Link to={`/pressTwo?id=${e.id}`}>{e.title}</Link> 
                    </h4>
                    <h5>{e.sub_title}</h5>
                    <p>{e.con}</p>
                  </div>
                </div>
                {/*news_text end*/}
                <div className="news_detail left">
                  <div>
                    <h4 className="news_date">{e.time}</h4> 
                    <div className="news_more clear">
                      <a>
                        <button><Link to={`/pressTwo?id=${e.id}`}>继续阅读</Link></button>
                      </a>
                    </div>
                  </div>
                </div>
                {/*news_detail end*/}
              </li>
              })}
            </ul> 
          </div>
        </div>
      </div>
    );
  }
}
export default Press;
