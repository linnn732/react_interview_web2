//建立Express伺服器
var express = require('express');

//使用request模塊向http請求
var request = require('request');
//fs模塊用於對系統文件及目錄進行讀寫操作
var fs = require('fs');
//使用Express伺服器
var app = express();
var cors = require('cors');
const path = require('path');
//var bodyParser =require('body-parser')

// var https = require('https');
var http = require('http');
const { red } = require('@material-ui/core/colors');
const DomainName =  "localhost";
const SSLPORT =  "3000";
const fetch = require('node-fetch');
global.Headers = fetch.Headers;  

const httpServer = http.createServer(app);

httpServer.listen(SSLPORT, function () {
    console.log('HTTPS Server is running on: http://%s:%s', DomainName, SSLPORT);
}); 

//app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'));

const bodyParser = require('body-parser'); //使req.body轉json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
            extended: true
}));

app.get('/', function (request, response) {
    response.clearCookie('token')
    console.log(`---- app.get | /----`)
    response.sendFile(path.join(__dirname, 'static/index.html'), function (err) {
        if (err) {
            response.status(500).send(err)
        }
    })
});

// 前端api呼叫後端api - 查詢面試名單
app.post('/getbuilddata',(req, res) =>{

    var options = {
        'method': 'POST',
        'url': 'http://localhost:8080/getDBdata',
        //'body': JSON.stringify(req.body),
        'json': req.body,
        'headers': {'Content_Type': 'application/json'}
    };
    
    request(options, function (error, response){
        if (error) throw new Error(error);
        res.send(response.body); //reponse.body
      });
})
 
//前端api呼叫後端api - 儲存面試資料
app.post('/savedata',(req, res) =>{

    var options = {
        'method': 'POST',
        'url': 'http://localhost:8080/savebuild',
        //'body': JSON.stringify(req.body),
        'json': req.body,
        'headers': {'Content_Type': 'application/json'}
    };
    
    request(options, function (error, response){
        if (error) throw new Error(error);
        res.send(response.body); //reponse.body
      });
})