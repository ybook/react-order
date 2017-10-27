import React from "react";
import styled from 'styled-components';
import {Route, Link } from 'react-router-dom';

var Div = styled.div`
	width:100%;
	height:60%;
	padding-top:40%;
	h1{width:100%;text-align:center;color:red;font-size:1.5em;}
`

class ChildB extends React.Component {
	render() {
		return(
			<Div>
				<h1>小蚂蚁点餐管理</h1>
				<Link to="/">坐席管理</Link>
				<Link to="/">服务员管理</Link>
				<Link to="/">厨房管理</Link>
			</Div>
		)
	}
}
export default ChildB;