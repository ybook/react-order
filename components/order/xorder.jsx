import React from "react";

import styled from 'styled-components';
import {Route, Link } from 'react-router-dom';
import {connect} from "react-redux";
import $ from 'jquery';

const Div = styled.div`
	width:100%;
	height:60%;
	padding-top:40%;
	h1{font-size:1.5em;color:#e21e41;width:100%;text-align:center;}
	p{font-size:.9em;padding-left:20%;padding-top:10%;position:relative;width:40%;}
	span{font-size:1.2em;color:red;font-weight:bold;display:block;
	position:absolute;right:0;bottom:0;
	}
	a{display:block;width:60%;height:8%;background:#22bb22;border-radius:1em;color:#fff;text-align:center;
	margin-left:20%;margin-top:10%;
	}
	a.nothing{display:none;}
	a.yidian{background:blue;}
	a.pay{background:red;}
	a.pink{background:#780179;}
	a.ccc{background:#908c8c;}
	.calltext{text-align:center;color:red;}
	.ordertext{text-align:center;color:red;}
	.hidde{display:none;}
`;

class ChildA extends React.Component {
	constructor(props) {
    super(props);
    const socket = this.props.socket;
    this.state={
    	id:'',
    	myname:'client',
    	socket:socket
    }
    this.topoint=(event)=>{
    	if(!$(event.target).hasClass('nothing')){
    		window.location.href="#/point";
    	}
    }
    this.callserver=(event)=>{
    	if(!$(event.target).hasClass('ccc')){
    		$(event.target).addClass('ccc');
    		$('.calltext').show();
    		this.props.callline();
    		this.props.callFW();
    	}
    }
    this.callorder=(event)=>{
    	if(!$(event.target).hasClass('ccc')){
    		$(event.target).addClass('ccc');
    		$('.ordertext').show();
    		this.props.orderline();
    		this.props.callMD();
    	}
    }
    this.setInit=()=>{
    	console.log(this.props.match.params.id);
    	var id = this.props.match.params.id;
    	this.setState({
    		id:id
    	})
    	this.props.setId(this);   	
    }
    this.ready()
}	
	ready(){
		var self = this;
		this.state.socket.on('overfw', msg => {
			if(msg.num==self.props.match.params.id){
				self.props.callover();
				$('a.fuwubtn').removeClass('ccc').addClass('pink');
				$('.calltext').hide();
			}
		});
		this.state.socket.on('overmd', msg => {
			if(msg.num==self.props.match.params.id){
				self.props.orderover();
				$('a.pay').removeClass('ccc');
				$('.ordertext').hide();
			}
		});
	}
	componentDidMount(){
		this.setInit();
	}
	render() {
	    return (
	      <Div>
	      	<h1 className="animated fadeInLeft">小蚂蚁餐厅欢迎您</h1>
			<p>您的坐席号:<span>{this.props.match.params.id}</span></p>
			<Link to="/foods">{this.props.allreadyNum==0?'开始点餐':'加菜'}</Link>
			<a onClick={this.topoint} className={`yidian${this.props.allreadyNum==0?' nothing':''}`}>{this.props.allreadyNum==0?'暂未点餐':'已点菜单'}</a>
			<a onClick={this.callorder} className={`pay${this.props.allreadyNum==0?' nothing':''}${this.props.orderonline?' ccc':''}`}>{this.props.allreadyNum==0?'暂未消费':'付款'}</a> 
			<div className={`ordertext${this.props.orderonline?'':' hidde'}`}>小二正在帮您结算,稍等···</div>
			<a className={`fuwubtn${this.props.callonline?' ccc':' pink'}`} onClick={this.callserver}>呼叫服务</a>
			<div className={`calltext${this.props.callonline?'':' hidde'}`}>呼叫成功,小二赶来中···</div>
	      </Div>
	    )
	}
}
export default connect((state) => {
  console.log(state)
  return state
},(dispatch) => {
  return {
    setId(self){
    	dispatch({type: "CALLP", num:self.props.match.params.id})
    },
    callline(){
    	dispatch({type:"CALLLINE",callonline:true})
    },
    callover(){
    	dispatch({type:"CALLLINE",callonline:false})
    },
    orderline(){
    	dispatch({type:"ORDERLINE",orderonline:true})
    },
    orderover(){
    	dispatch({type:"ORDERLINE",orderonline:false})
    }
  }
})(ChildA);