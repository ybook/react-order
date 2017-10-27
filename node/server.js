var multer = require("multer");
var express = require('express');
var app = require('express')();
var server = require('http').createServer();
var bodyParser = require('body-parser');
var socket = require("socket.io");
var io = socket(server);
//引入mysql的第三方模块
var mysql = require('mysql');
var fs = require("fs");

var connection = mysql.createConnection({
    hostname:'localhost',
    user:'root',
    password:'',
    database:'foods'
});
connection.connect();

server.listen(3001);
//连接
io.on('connection',function(socket){
    //接收服务员id号
    socket.on('serveId',function(data){      
		io.emit('send',{
            name:123
        });
    }) 
    //接收客户呼叫服务请求
    socket.on('callFW',function(data){
		console.log(data)       
		io.emit('callFW',data);
    })
    //接收服务端处理呼叫服务结果
    socket.on('overfw',function(data){
		console.log(data)       
		io.emit('overfw',data);
    })
    //接收客户呼叫买单请求
    socket.on('callMD',function(data){
		console.log(data)       
		io.emit('callMD',data);
    })
    //接收服务端处理呼叫买单结果
    socket.on('overmd',function(data){
		console.log(data)       
		io.emit('overmd',data);
    })
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); 

//前端数据初始化得到菜品类型
app.post('/getType',function(req,res){
    res.append("Access-Control-Allow-Origin","*");
	var sqlyj = "SELECT distinct type FROM foodslist";
	connection.query(sqlyj,function(error, results, fields){
        if(error) throw error;
        console.log('The solution is: ', results);
        res.send(JSON.stringify({
            status: 1,
            results
        }))
    })
})
//根据不同类型拿到该类型下的所有菜单
app.get('/getfoods',function(req,res){
    res.append("Access-Control-Allow-Origin","*");
    console.log(req.query);
    if(req.query.type===undefined){
    	var sqlyj = "select * from foodslist where tuijian='Y'";   	
    }else{
    	var sqlyj = `select * from foodslist where type='${req.query.type}'`;
    }
	connection.query(sqlyj,function(error, results, fields){
        if(error) throw error;
        console.log('The solution is: ', results);
        res.send(JSON.stringify({
            status: 1,
            results
        }))
    })
})

app.listen(12345);
console.log("开启服务器")