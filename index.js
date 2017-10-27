import React from "react";
import ReactDOM from "react-dom";
import Xhome from "./components/order/xhome.jsx";
import {Provider} from "react-redux";
import store from "./lib/store.js";
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import "./css/animate.css";
import "weui";

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={Xhome}></Route>			
		</Router>
  	</Provider>,document.getElementById("demo"))
