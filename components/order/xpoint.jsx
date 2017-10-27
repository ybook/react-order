import React from "react";
import styled from 'styled-components';
import {connect} from "react-redux";
import $ from "jquery";

const Div = styled.div`
	width:100%;height:100%;background:#f2f2f2;
	.red{color:red;}
	.blue{color:blue;}
	.little{font-size:.8em;}
	.hidde{display:none;}
	header{
		width:100%;background:#7070ce;text-align:center;height:6%;color:#fff;font-size:1.2em;font-weight:bold;
		span{display:block;font-size:.9em;position:absolute;color:#52c7ce;}
	}
	h3{
		height:5%;font-size:1em;text-align:center;background:#404e96;color:#ea4747;
		.imgbox{
			position:absolute;right:0;top:0;height:8%;transform-style:3d;background:#ea4747;border-radius:30%;
			@keyframes xuanzhuan {
				0%{opacity:1;}
				50%{transform:rotateY(180deg);opacity:0;}
				100%{transform:rotateY(360deg);opacity:1;}
			}
			@keyframes tihuan {
				0%{opacity:0;}
				50%{opacity:1;}
				100%{opacity:0;}
			}
			.titlebox{position:absolute;bottom:0;right:0;width:100%;font-size:.8em;height:68%;color:#fff;animation:tihuan 10s infinite;}
			img{height:100%;animation:xuanzhuan 10s infinite;background:#7070ce;border-radius:30%;}
			.text{position:absolute;right:0;bottom:-1.5em;width:140%;height:1.5em;color:red;font-size:.8em;}
		}
	}
	.mains{
		height:83%;overflow-y:auto;
		ul{
			li{
				height:2em;padding:.3em 0;
				p{
					width:60%;padding-left:10%;height:2em;line-height:2em;
					.flow{
						float:right;display:block;line-height:2em;
					}
				}
			}
			.msg{
				color:blue;width:100%;
				p{color:#000;width:80%;margin-left:10%;}
			}
		}
	}
	footer{
		height:6%;background:#7070ce;font-size:.9em;position:relative;
		span{display:block;position:absolute;left:20%;top:0;height:100%;line-height:36px;}
		.topay{position:absolute;right:0;bottom:0;height:100%;width:30%;background:#ea4747;text-align:center;line-height:36px;color:#fff;}
		.topay.ccc{background:#908c8c;}
		img{height:100%;display:block;position:absolute;left:0;bottom:0;}
		.callpaytext{position:absolute;left:0;top:-2em;width:100%;height:2em;text-align:center;background:#fff;}
		.hidde{display:none;}
	}
`

class Xpoint extends React.Component {
	constructor(props) {
    super(props);
    const socket = this.props.socket;
    this.state={
    	myname:'client',
    	socket:socket
    }
    //整面列表初始化
    this.listInit=()=>{
    	var self = this;
    	return this.props.allreadypoint.map(function(item,idx){
    		return <ul key={idx}>
    			<li><span className="red">{idx+1} ></span><span className="little blue">下单时间: {item.time}</span></li>
    			{self.inListInit(item.haspoint)}
    			<li className="blue">&nbsp;&nbsp;&nbsp;&nbsp;口味:  {item.taster}</li>
    			<div className="msg">&nbsp;&nbsp;&nbsp;&nbsp;留言备注: <p style={{fontSize:'.8em'}}>{item.leMsg}</p></div>
    			<li className="red">&nbsp;&nbsp;&nbsp;&nbsp;小计: ¥ {item.totalpay}</li>
    		</ul>
    	})
    }
    //所点菜单初始化
    this.inListInit=(items)=>{
    	console.log(items);
    	var liarr=[];
    	for(var attr in items){
    		liarr.push(<li key={attr}>
    			<p className="little">{attr} x <span className="red">{items[attr]}</span><span className="flow"><i className="weui-icon-waiting"></i>待出菜</span></p>
    			</li>)
    	}
    	return liarr;
    }
    //呼叫服务系统
	this.call = (event) => {
		if(!$(event.target).parent().hasClass('callonline')){
			$(event.target).parent().addClass('callonline');
			$('.text').show();
			this.props.callline();
			this.props.callFW();
		}
	}
	//呼叫买单系统
	this.callpay=(event)=>{
		if(!$(event.target).hasClass('ccc')){
			$('.callpaytext').show();
			$('.topay').addClass('ccc');
			this.props.orderline();
			this.props.callMD();
		}
	}
	//回到首页
	this.backhome=()=>{
		window.location.href="#/order/"+this.props.num;
	}
	//监听socket
	this.ready();
}
	ready(){
		var self = this;
		this.state.socket.on('overmd', msg => {
			if(msg.num==self.props.num){
				self.props.orderover();
				$('.topay').removeClass('ccc');
				$('.callpaytext').hide();
			}
		});
	}
	componentDidMount(){
		console.log(this);
	}
  render() {
    return (
      <Div className="animated fadeInLeft">
		<header><span onClick={this.backhome}>&lt;返回首页</span>已点菜单</header>
		<h3>小蚂蚁餐厅-<span>{this.props.num}</span>
			<div className={`imgbox${this.props.callonline?' callonline':''}`} onClick={this.call}>
		      	<img src="./img/waiter.png"/>
		      	<div className="titlebox">服务</div>
		      	<div className={`text${this.props.callonline?'':' hidde'}`}>呼叫成功</div>
	      	</div>
		</h3>
		<div className="mains">{this.listInit()}</div>
		<footer>
			<img src="./img/gouwuche.png"/><span>合计¥{this.props.alltopay}</span>
			<div className={`topay${this.props.orderonline?' ccc':''}`} onClick={this.callpay}>呼叫买单</div>
			<div className={`callpaytext red${this.props.orderonline?'':' hidde'}`}>小二正在快马加鞭赶来···</div>
		</footer>
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
    },
    callline(){
    	dispatch({type:"CALLLINE",callonline:true})
    },
    orderline(){
    	dispatch({type:"ORDERLINE",orderonline:true})
    },
    orderover(){
    	dispatch({type:"ORDERLINE",orderonline:false})
    }
  }
})(Xpoint);