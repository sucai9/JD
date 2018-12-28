var fs = require('fs');
var multer = require('multer');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
app.use(express.static('www'));

app.listen(8888,function(){
    console.log('京东后台服务器启动');
})