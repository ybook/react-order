import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./lib/serveStore.js";
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import {IndexRoute} from 'react-router' 
import "./css/animate.css";
import "weui";
import App from './components/serve/xapp.jsx'

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route path='/' component={App}></Route>
		</Router>
  	</Provider>,document.getElementById("box"))