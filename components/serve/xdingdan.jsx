import React from "react";
import styled from 'styled-components';
import {connect} from "react-redux";
import io from 'socket.io-client';
import axios from "axios";
import $ from "jquery";

var Div = styled.div`
	width:100%;
	height:100%;
	h1{width:100%;text-align:center;color:red;font-size:1.5em;height:8%;}
	.mains{
		height:92%;background:#f2f2f2;
	}
`

class Xdingdan extends React.Component {
	constructor(props) {
	    super(props);
	    this.state={
	    	myname:'serve',
	    	socket:io('http://localhost:3001'),
	    	fwarr:[],
	    	fwoverarr:[],
	    	activeN:1
	    }
	    //呼叫服务系统消息读取后改为已读
	    this.hasRead=(event)=>{
	    	var idx = $(event.target).parents('li').data('id');
	    	var num = $(event.target).parents('li').data('num');	    	
	    	var item = this.state.fwarr.splice(idx,1);
	    	var newfwarr = this.state.fwarr.slice();
	    	this.state.fwoverarr.push(item[0]);
	    	var newfwoverarr = this.state.fwoverarr.slice();
	    	this.setState({
	    		fwarr:newfwarr,
	    		fwoverarr:newfwoverarr
	    	})
	    	this.state.socket.emit('overfw',{num:num});
	    }
	    this.fwlist=()=>{
	    	var self =this;
	    	if(this.state.activeN==1){
	    		return this.state.fwarr.map(function(item,idx){
		    		return <li key={idx} data-id={idx} data-num={item.num}>
		    			<p>{(idx+1)+'->'+item.time}</p>
		    			<p>{item.num+"  坐席呼叫服务"}</p>
		    			<div className="noRead" onClick={self.hasRead}>未处理</div>
		    		</li>;
		    	})
	    	}else{
	    		return this.state.fwoverarr.map(function(item,idx){
		    		return <li key={idx}>
		    			<p>{(idx+1)+'->'+item.time}</p>
		    			<p>{item.num+"  坐席呼叫服务"}</p>
		    			<div className="doRead">已处理</div>
		    		</li>;
		    	})
	    	}
	    	
	    }
	    this.change=(event)=>{
	    	if(!$(event.target).hasClass('active')){
	    		var newN = this.state.activeN==1?2:1;
		    	this.setState({
		    		activeN:newN
		    	})
	    	}	    	
	    }
	    
  	}
	ready(){
		var self = this;
		const socket = this.state.socket;
		socket.on('callFW', msg => {
			console.log(msg);
			var fwarr = self.state.fwarr.slice();	
			fwarr.push(msg);
			console.log(fwarr);
			self.setState({
				fwarr:fwarr
			})
		});
	}
	componentWillMount(){
		
	}
	render() {
	    return (
	    <Div>
			<h1>小蚂蚁订单管理</h1>
			<div className="mains">
				
			</div>			
		</Div>
	    )
	}
}
export default connect((state) => {
  console.log(state)
  return state
},(dispatch) => {
  return {
    call() {
    	dispatch({type: "CALLP", num:this.state})
    }
  }
})(Xdingdan);