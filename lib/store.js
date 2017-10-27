import {createStore} from "redux";
import io from 'socket.io-client';

let store = createStore((state = {
	socket:io("http://localhost:3001"),
	callFW:()=>{
		console.log(state);
		const socket = state.socket;
		var num = state.num;
		var now = new Date().toLocaleString();
		socket.emit('callFW',{num:num,time:now,type:'fw'});
	},
	callMD:()=>{
		console.log(state);
		const socket = state.socket;
		var num = state.num;
		var now = new Date().toLocaleString();
		socket.emit('callMD',{num:num,time:now,type:'md'});
	},
	allreadyNum:0,
	num:null,
	alltopay:0,
	allreadypoint:[],
	callonline:false,
	orderonline:false
}, action) => {
  switch (action.type) {
    case "SETLIST":
    	var newNum=state.allreadyNum+action.list.total;
    	var alltopay = state.alltopay+action.list.totalpay;
    	var allarr = state.allreadypoint.push(action.list);
      	return Object.assign(state,{list: action.list},{allreadyNum:newNum,alltopay:alltopay})
      	break;
    case "CALLP":
      	return Object.assign(state,{num:action.num})
      	break;
    case "CALLLINE":
      	return Object.assign(state,{callonline:action.callonline})
      	break;
    case "ORDERLINE":
      	return Object.assign(state,{orderonline:action.orderonline})
      	break;
    default:
      	return state
  }
})

export default store