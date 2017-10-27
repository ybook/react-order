import React from "react";
import styled from 'styled-components';
import {Route, Link } from 'react-router-dom';
import Xorder from "./xorder.jsx";
import Manage from "../manage.jsx";
import Xfoods from "./xfoods.jsx";
import Xpoint from "./xpoint.jsx";

var Div = styled.div `
	width:100%;
	height:100%;
`
class Xhome extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
    	<Div>
    		<Route exact path="/" component={Manage}></Route>
    		<Route path="/order/:id" component={Xorder}></Route> 
    		<Route path="/foods" component={Xfoods}></Route>
    		<Route path="/point" component={Xpoint}></Route>
    	</Div>      	
		)
	}
}
export default Xhome;