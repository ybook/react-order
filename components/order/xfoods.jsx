import React from "react";
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import { connect } from "react-redux";
import axios from "axios";
import $ from "jquery";

const Div = styled.div `
	width:100%;height:100%;background:#f2f2f2;
	.hidde{display:none;}
	.red{color:red;}
	.maxPig{
		width:100%;height:100%;background:rgba(0,0,0,.85);position:absolute;z-index:1000;
		img{display:block;width:100%;margin-top:32%;}
	}
	.weui-icon-success-no-circle.weui-icon_toast.green {
		&::before{color: #58bc58;}
	}
	.weui-toast{display:none;}
	.green{color: #58bc58;}
	header{width:100%;background:#7070ce;text-align:center;height:6%;color:#fff;font-size:1.2em;font-weight:bold;}
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
	.back{
		position:absolute;left:0;top:0;height:6%;width:9%;
		img{height:100%;}
	}
	.main{
		height:83%;background:#fff;
		.left{
			width:26%;background:#6464de;height:100%;overflow-y:auto;float:left;
			li{
				width:100%;text-align:center;height:40px;line-height:40px;color:#fff;border-bottom:1px solid #fff;
				position:relative;
				div{
					width:1.3em;height:1.3em;border-radius:50%;background:#ea4747;color:#fff;
					position:absolute;right:0;top:-3px;text-align:center;line-height:1.3em;
				}
			}
			li.active{
				background:#fff;color:#6464de;font-weight:bold;position:relative;
				&::before{content:'';width:3px;height:100%;position:absolute;left:0;top:0;background:#6464de;}
			}
			li.yidianmenu{background:#58bc58;}
			li.ccc{background:#908c8c;}
		}
		.right{
			width:72%;background:#fff;max-height:100%;overflow-y:auto;float:right;list-style:none;padding-left:2%;
			font-size:.8em;
			li{
				width:100%;height:40%;overflow:hidden;padding:10px 0;border-bottom:1px solid #ccc;
				img{width:40%;display:block;float:left;}
				.foodmsglist{
					width:60%;float:left;position:relative;
					p{padding-top:10%;padding-bottom:10%;padding-left:1em;}
					.countbox{
						height:10%;width:45%;position:absolute;right:16px;bottom:10px;
						.leftsub{
							float:left;width:66%;overflow:hidden;
							span{display:block;width:50%;float:left;text-align:center;}
							img{display:block;width:50%;float:left;}
						}
						img{display:block;float:right;width:33%;}
					}
					
				}
			}
			

		}
	}
	footer{
		height:6%;background:#7070ce;font-size:.9em;position:relative;
		span{display:block;position:absolute;left:20%;top:0;height:100%;line-height:36px;}
		.topay{position:absolute;right:0;bottom:0;height:100%;width:30%;background:#ea4747;text-align:center;line-height:36px;color:#fff;}
		.topay.ccc{background:#908c8c;}
		img{height:100%;display:block;position:absolute;left:0;bottom:0;}
	}
	.verifybox{
		width:100%;height:100%;background:#fff;position:absolute;left:0;right:0;top:0;display:none;
		.varTop{width:100%;height:8%;background:#7070ce;text-align:center;color:#fff;font-size:1.5em;}
		.varfoodlist{
			width:100%;height:84%;background:#f2f2f2;overflow-y:auto;
			.vartypelist{
				list-style:none;
				p{height:2em;line-height:2em;text-indent:1em;color:red;}
				ul{
					width:100%;overflow:hidden;list-style:none;background:#fff;font-size:.8em;
					li{width:50%;float:left;padding:9px 0;}
				}
			}
			.taster{
				padding:10px 0;
				p{text-indent:1em;}
				input{margin-left:20px;}
			}
			.beizhu{
				p{text-indent:1em;}
				textarea{
					margin-left:10px;padding:5px;
					&:focus{outline:none;}
				}
			}
			.vartotal{background:#fff;text-indent:1em;}
		}
		.varfoot{
			width:100%;height:7%;font-size:1.3em;
			.varfootLeft{width:40%;background:#ccc;float:left;border-radius:10px;;height:100%;text-align:center;}
			.varfootRight{width:58%;background:red;float:right;border-radius:10px;height:100%;text-align:center;color:#fff;}
		}
		
	}
	.backbox{
		width:100%;height:100%;position:absolute;left:0;top:0;right:0;background:rgba(0,0,0,.8);z-index:1000;display:none;
		.weui-dialog{display:none;}
		.sureBack{width:80%;height:30%;margin:50% auto;background:#fff;}
	}
`;

class Xfoods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			myname:'client',
			activeidx: -1,
			typearr: [],
			hasTui: true,
			foodsarr: [],
			total: 0,
			totalpay: 0,
			haspoint:{},
			taster:"不辣",
			leMsg:''
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
		//匹配每个菜的数量并控制减少按钮和数量显示隐藏
		this.testHas=(item)=>{
			var self = this;
			if(!self.state.haspoint.hasOwnProperty([item.name])||self.state.haspoint[item.name]<=0){
				return true;
			}else{
				return false;
			}
		}
		//点餐增加按钮
		this.add = (event) => {
			var now = Number($(event.target).parent().find('span').text());
			console.log($(event.target).parents('li').data('pay'))
			var type = $(event.target).parents('li').data('type');
			var pay = Number($(event.target).parents('li').data('pay'));
			var fname = $(event.target).parents('li').data('fname');
						
			var num = this.state[type].num;
			var total = this.state.total;
			var totalpay = this.state.totalpay;
			var yidian = this.state.haspoint;
			var inType = this.state[type];

			if(yidian[fname]===undefined){
				yidian[fname]=1;
			}else{
				var newnum = yidian[fname]+1;
				yidian[fname]=newnum;
			}
			var newIntype = Object.assign(inType,{ num: num + 1 },{[fname]:yidian[fname]})
			
			this.setState({
				[type]: newIntype,
				total: total + 1,
				totalpay: totalpay + pay,
				haspoint:Object.assign({},yidian)
			})
			$(event.target).parent().find('span').text(now + 1);
		}
		//点餐减少按钮
		this.subcut = (event) => {
			var now = Number($(event.target).siblings('span').text());
			var type = $(event.target).parents('li').data('type');
			var pay = Number($(event.target).parents('li').data('pay'));
			var fname = $(event.target).parents('li').data('fname');
			

			var num = this.state[type].num;
			var total = this.state.total;
			var totalpay = this.state.totalpay;
			var yidian = this.state.haspoint;
			var inType = this.state[type];
			if(yidian[fname]<=1){
				yidian[fname]=0;
			}else{
				var newnum = yidian[fname]-1;
				yidian[fname]=newnum;
			}
			var newIntype = Object.assign(inType,{ num: num - 1 },{[fname]:yidian[fname]})
			
			this.setState({
				[type]:newIntype,
				total: total - 1,
				totalpay: totalpay - pay,
				haspoint:Object.assign({},yidian)
				
			})
			if(now <= 1) {
				var now = 1;
			}
			$(event.target).siblings('span').text(now - 1);
		}
		//控制图片放大隐藏
		this.toggel=(event)=>{
			$('.maxPig').stop().animate({width:'toggle',height:'toggle'},500);
			var imgurl = $(event.target).attr('src');
			$('.maxPig').find('img').attr('src',imgurl);
		}
		//左侧导航分类按钮点击后高亮和右侧数据请求并处理
		this.chiose = (type, idx) => {
			var self = this;
			var rightbox = document.querySelector(".right");
			rightbox.scrollTop = 0;
			this.setState({
				activeidx: idx
			})
			if(idx != -1) {
				axios.get('http://localhost:12345/getfoods?type=' + type)
					.then(function(res) {
						self.setState({
							foodsarr: res.data.results.slice()
						})
						console.log(self.state);
					})
					.catch(function(error) {
						console.log(error);
					});
			} else {
				axios.get('http://localhost:12345/getfoods')
					.then(function(res) {
						self.setState({
							foodsarr: res.data.results.slice()
						})
						console.log(self.state);

					})
					.catch(function(error) {
						console.log(error);
					});
			}

		}
		//左侧导航生成初始化
		this.leftLiIn = () => {
			var self = this;
			return this.state.typearr.map(function(item, idx) {
				return <li onClick={self.chiose.bind(this,item,idx)} key={idx} className={self.state.activeidx==idx?'active':''}>
					{item}
					<div className={self.state[item].num==0?'hidde':''}>{self.state[item].num}</div>
				</li>
			})
		}
		//右侧菜单生成初始化
		this.rightInit = () => {
			var self = this;
			return this.state.foodsarr.map(function(item) {
				return <li key={item.id} className={item.max==0?'hidde':''} data-type={item.type} data-pay={item.price} data-fname={item.name}>
					<img src={"./img/"+item.imgurl} onClick={self.toggel}/>
					<div className="foodmsglist">
						<p>{item.name}</p>
						<p className="red">¥{item.price}</p>
						<div className="countbox">
							<div className={`leftsub${self.testHas(item)?' hidde':''}`}>
							<img src="./img/jianhao.png" onClick={self.subcut}/>
							<span>{(function(item){
								if(!self.state.haspoint.hasOwnProperty([item.name])){
									return 0;
								}else{
									return self.state.haspoint[item.name];
								}
									

							})(item)}</span>
							</div>
							<img src="./img/jiahao.png" onClick={self.add}/>
						</div>
					</div>
				</li>
			})
		}
		//确认界面弹出和关闭
		this.hasallOk=(event)=>{
			if(!$(event.target).hasClass('ccc')){
				$('.verifybox').stop().animate({width:'toggle'},500)
			}			
		}
		//确认界面列表初始化
		this.verlistInit=()=>{
			var self = this;
			var hasInarr=this.state.typearr.filter(function(item){
				return self.state[item].num>0;
			})
			return hasInarr.map(function(item){
				return <li key={item} className="vartypelist">
				<p>{item} :</p>
				<ul>{
					self.querenlist(item)
				}</ul>
				</li>
			})
		}
		//确认界面已点清单生成
		this.querenlist=(item)=>{
			var self = this;
			var resarr=[];
			for(var attr in self.state[item]){
				if(attr!='num'&&self.state[item][attr]>0){
					var html = <li key={attr}>
					<i className="weui-icon-success"></i>
					<span>{attr}</span>   x <span className="red">{self.state[item][attr]}</span>
					</li>
					resarr.push(html)
				}
			}
			return resarr;
		}
		//口味选择
		this.tastChange=(event)=>{
			this.setState({
				taster:event.target.value
			})
		}
		//下单成功显示
		this.successIn=()=>{
			$(".weui-toast").show("slow");
			var msg = $('.leaveMsg').val();
			this.setState({
				leMsg:msg
			})
			this.props.allSuccess(this.state);
		}
		//留言记录
		this.msgChange=(event)=>{
			this.setState({
				leMsg:event.target.value
			})
		}
		//去到已点页面
		this.topoint=(event)=>{
			if(!$(event.target).hasClass('ccc')){
				window.location.href="#/point";
			}			
		}
		//返回首页弹窗
		this.backhome=(event)=>{
			var self = this;
			if($(event.target).hasClass('weui-dialog__btn_primary')){
				setTimeout(function(){
					window.location.href="#/order/"+self.props.num;
				},500)
			}
			$('.backbox').stop().animate({width:'toggle',height:'toggle'},500)
			$('.weui-dialog').stop().animate({width:'toggle',height:'toggle'},500)
		}
	}

	//挂载前请求数据并存到state里面
	//挂载后直接渲染
	componentWillMount() {
		var self = this;
		axios.post("http://localhost:12345/getType")
			.then(function(res) {
				console.log(res.data.results);
				var newres = res.data.results.map(function(item) {
					self.setState({
						[item.type]: { num: 0 }
					})
					return item.type;
				})
				self.setState({
					typearr: newres.slice()
				})
				axios.get("http://localhost:12345/getfoods")
					.then(function(response) {
						console.log(response);
						if(response.data.results[0] === undefined) {
							self.setState({
								hasTui: false,
								activeidx: 0,
							})
							axios.get('http://localhost:12345/getfoods?type=' + self.state.typearr[0])
								.then(function(res1) {
									self.setState({
										foodsarr: res1.data.results.slice()
									})
									console.log(self.state);
								})
								.catch(function(error) {
									console.log(error);
								});
						} else {
							self.setState({
								hasTui: true,
								activeidx: -1,
								foodsarr: response.data.results.slice()
							})
							console.log(self.state);

						}
					})
					.catch(function(error) {
						console.log(error);
					});
			})
			.catch(function(err) {
				console.log(err);
			});
	}
	componentDidMount() {}
	render() {
		return(
		<Div className="animated fadeInLeft">
			<div className="maxPig hidde" onClick={this.toggel}>
				<img src=""/>
			</div>
			<div className="backbox">
				<div className="weui-dialog">
                <div className="weui-dialog__hd"><strong className="weui-dialog__title">提示</strong></div>
                <div className="weui-dialog__bd">返回后您选择的菜品将清空哦!</div>
                <div className="weui-dialog__ft">
                    <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default" onClick={this.backhome}>按错了</a>
                    <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.backhome}>确定</a>
                </div>
            </div>
			</div>
      	<header>点餐</header>
      	<a className="back" onClick={this.backhome}><img src="./img/back.png"/></a>
      	<h3>小蚂蚁餐厅-<span>{this.props.num}</span>
	      	<div className={`imgbox${this.props.callonline?' callonline':''}`} onClick={this.call}>
		      	<img src="./img/waiter.png"/>
		      	<div className="titlebox">服务</div>
		      	<div className={`text${this.props.callonline?'':' hidde'}`}>呼叫成功</div>
	      	</div>
      	</h3>
      	<div className="main">
      		<div className="left">
	      		<ul>
	      			<li className={`${this.state.activeidx==-1?'active':''} ${this.state.hasTui?'':'hidde'}`} onClick={this.chiose.bind(this,"今日推荐",-1)}>今日推荐</li>
	      			{this.leftLiIn()}
	      			<li className={`yidianmenu${this.props.allreadyNum==0?' ccc':''}`} onClick={this.topoint}>已点菜单<div className={this.props.allreadyNum==0?'hidde':''}>{this.props.allreadyNum}</div></li>
	      		</ul>
      		</div>
      		<div className="right">
      		{this.rightInit()}
      		</div>
      	</div>
      	<footer><img src="./img/gouwuche.png"/><span>已选{this.state.total}份;共计¥{this.state.totalpay}</span><div className={`topay${this.state.total==0?' ccc':''}`} onClick={this.hasallOk}>选好了</div></footer>
      	<div className="verifybox">
      		<div className="varTop">已选菜品</div>
      		<div className="varfoodlist">
      			<div className="vartotal">
      			<span style={{color:'blue'}}>您的坐席: {this.props.num} ></span> 已选 {this.state.total} 份; 合计¥ {this.state.totalpay}
      			</div>
      			{this.verlistInit()}
		      	<div className="taster">
					<p className="red">口味选择 :</p>
					<input type="radio" value="不辣" name="taste" id="x1" checked={ this.state.taster == "不辣" ? true : false} onChange={this.tastChange}/><label htmlFor="x1"> 不辣</label>
					<input type="radio" value="微辣" name="taste" id="x2" checked={ this.state.taster == "微辣" ? true : false} onChange={this.tastChange}/><label htmlFor="x2"> 微辣</label>
					<input type="radio" value="中辣" name="taste" id="x3" checked={ this.state.taster == "中辣" ? true : false} onChange={this.tastChange}/><label htmlFor="x3"> 中辣</label>
					<input type="radio" value="加辣" name="taste" id="x4" checked={ this.state.taster == "加辣" ? true : false} onChange={this.tastChange}/><label htmlFor="x4"> 加辣</label>	
				</div>
				<div className="beizhu">
					<p className="red">留言备注 :</p>
		      		<textarea className="leaveMsg" onChange={this.msgChange} max-length="50" rows="4" cols="35" style={{resize:'none'}} placeholder="请输入您的留言(50字以内)"/>
		      	</div>
		    </div>
	      	
	      	<div className="varfoot">
	      		<div className="varfootLeft" onClick={this.hasallOk}>再看看</div>
	      		<div className="varfootRight" onClick={this.successIn}>确认点餐</div>
	      	</div>
      	</div>
      	<div className="weui-toast">
			<i className="weui-icon-success-no-circle weui-icon_toast green"></i>
			<p className="weui-toast__content green">下单成功</p>
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
    allSuccess(self) {
      console.log(self);
      var now = new Date().toLocaleString();
      var thislist = {
      	haspoint:self.haspoint,
      	taster:self.taster,
      	totalpay:self.totalpay,
      	total:self.total, 
      	leMsg:self.leMsg,
      	time:now
      }
      console.log(thislist)
      dispatch({type: "SETLIST", list:thislist})
      setTimeout(function(){
      	window.location.href="#/point";
      },500)
    },
    callline(){
    	dispatch({type:"CALLLINE",callonline:true})
    }
  }
})(Xfoods);