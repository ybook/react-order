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
		.msglist{
			height:100%;
			.hujiao{
				overflow:hidden;height:8%;
				span{text-align:center;display:block;height:2em;line-height:2em;float:left;color:#fff;}
				.hujiaoY{background:red;width:70%;}
				.hujiaoN{background:#58bc58;width:30%;}
				span.active{background:#f2f2f2;color:red;font-weight:bold;}
			}
			ul{
				height:80%;overflow-y:auto;
				li{
					margin-bottom:5px;position:relative;
					p{height:1.5em;font-size:.9em;line-height:1.5em;}
					p:first-child{color:blue;text-indent:1em;}
					p:nth-child(2){color:red;text-indent:2em;}
					.noRead{width:20%;height:2.6em;background:#e21e41;position:absolute;right:0;top:0;line-height:2.6em;text-align:center;color:#fff;}
					.doRead{width:20%;height:2.6em;background:#58bc58;position:absolute;right:0;top:0;line-height:2.6em;text-align:center;color:#fff;}
				}
				li.ddd{background:#ddd;}
				li.red{background:#54d5dc;}
			}
		}
	}
`

class Xserve extends React.Component {
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
	    this.hasRead=(idx,num,type)=>{
	    	console.log(idx,num,type)
	    	var item = this.state.fwarr.splice(idx,1);
	    	var newfwarr = this.state.fwarr.slice();
	    	this.state.fwoverarr.push(item[0]);
	    	var newfwoverarr = this.state.fwoverarr.slice();
	    	this.setState({
	    		fwarr:newfwarr,
	    		fwoverarr:newfwoverarr
	    	})
	    	if(type=='fw'){
	    		this.state.socket.emit('overfw',{num:num});
	    	}
	    	if(type=='md'){
	    		this.state.socket.emit('overmd',{num:num});
	    	}
	    	
	    }
	    this.fwlist=()=>{
	    	var self =this;
	    	console.log(this.state)
	    	if(this.state.activeN==1){
	    		return this.state.fwarr.map(function(item,idx){
		    		return <li key={idx} className={item.type=='fw'?'ddd':'red'}>
		    			<p>{(idx+1)+'->'+item.time}</p>
		    			<p>{`${item.num}${item.type=='fw'?'  坐席呼叫服务':'  坐席呼叫买单'}`}</p>
		    			<div className="noRead" data-id={idx} data-num={item.num} data-type={item.type} onClick={self.hasRead.bind(self,idx,item.num,item.type)}>未处理</div>
		    		</li>;
		    	})
	    	}else{
	    		return this.state.fwoverarr.map(function(item,idx){
		    		return <li key={idx} className={item.type=='fw'?'ddd':'red'}>
		    			<p>{(idx+1)+'->'+item.time}</p>
		    			<p>{`${item.num}${item.type=='fw'?'  坐席呼叫服务':'  坐席呼叫买单'}`}</p>
		    			<div className="doRead">{item.type=='fw'?'已处理':'已买单'}</div>
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
	    this.ready();
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
		socket.on('callMD',msg=>{
			console.log(msg);
			var fwarr = self.state.fwarr.slice();	
			fwarr.push(msg);
			console.log(fwarr);
			self.setState({
				fwarr:fwarr
			})
		})
	}
	componentWillMount(){
		
	}
	render() {
	    return (
	    <Div>
			<h1>小蚂蚁服务管理</h1>
			<div className="mains">
				<div className="msglist">
					<p className="hujiao">
						<span className={`hujiaoY${this.state.activeN==1?' active':''}`} onClick={this.change}>待处理呼叫</span>
						<span className={`hujiaoN${this.state.activeN==2?' active':''}`} onClick={this.change}>已处理呼叫</span>
					</p>
					<ul className="todoList">
						{this.fwlist()}
					</ul>
				</div>
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
})(Xserve);