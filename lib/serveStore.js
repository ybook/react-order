import {createStore} from "redux";
import io from 'socket.io-client';
let store = createStore((state = {
	socket:io("http://localhost:3001"),
}, action) => {
  switch (action.type) {
    case "SETLIST":
    	var newNum=state.allreadyNum+action.list.total;
    	var alltopay = state.alltopay+action.list.totalpay;
    	var allarr = state.allreadypoint.push(action.list);
    return Object.assign(state,{list: action.list},{allreadyNum:newNum,alltopay:alltopay})
    console.log(state);
    break;
    default:
      return state
  }
})

export default store