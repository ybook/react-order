import React from "react";
import styled from 'styled-components';
import {Route, Link } from 'react-router-dom';
import Xserve from "./xserve.jsx";
import Xdingdan from "./xdingdan.jsx";

var Div = styled.div`
	width:100%;
	height:100%;
`

class ChildB extends React.Component {
	render() {
		return(
			<Div>
				<Route path="/serve" component={Xserve}></Route>
				<Route path="/dingdan" component={Xdingdan}></Route>
			</Div>
		)
	}
}
export default ChildB;