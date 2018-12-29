var fs = require('fs');
var multer = require('multer');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());
app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8888, function () {
    console.log('京东后台服务器启动');
});

// 注册
app.post("/register", function (req, res) {
    if (req.body.pwd != req.body.pwd2) {
        res.status(200).json({
            code: 1,
            info: "注册失败，两次输入密码不一致"
        });
        return;
    }
    fs.exists("users", function (ex) {
        if (ex) {
            fs.exists("users/" + req.body.petname + ".txt", function (ex2) {
                if (ex2) {
                    // 该用户已经存在
                    res.status(200).json({
                        code: 3,
                        info: "注册失败，该用户已经存在"
                    });
                } else {
                    // 该用于不存在
                    // 保存该用户
                    writeFile();
                }
            });
        } else {
            // 不存在users文件夹
            // 创建该文件夹
            fs.mkdir("users", function (err) {
                if (err) {
                    res.status(200).json({
                        code: 2,
                        info: "注册失败，创建文件夹失败"
                    });
                } else {
                    // 保存该用户
                    writeFile();
                }
            });
        }
    });
    // 保存该用户
    function writeFile() {
        fs.writeFile("users/" + req.body.petname + ".txt", JSON.stringify(req.body), function (err) {
            if (err) {
                res.status(200).json({
                    code: 4,
                    info: "注册失败，文件写入失败"
                });
            } else {
                res.status(200).json({
                    code: 0,
                    info: "注册成功"
                });
            }
        });
    }
});

// 登陆
app.post("/login", function (req, res) {
    var filename = "users/" + req.body.petname + ".txt";
    fs.exists(filename, function (ex) {
        if (ex) {
            // 存在
            // 判断密码是否一致,读取该用户的密码
            fs.readFile(filename, "UTF-8", function (err, data) {
                if (err) {
                    res.status(200).json({
                        code: 2,
                        info: "登录失败，系统异常"
                    });
                } else {
                    // data是从文件中读取出来的数据
                    // JSON.parse(data)  用户对象，
                    // 该用户的密码
                    // console.log(JSON.parse(data).pwd);
                    if (JSON.parse(data).pwd == req.body.pwd) {
                        // 密码也一致
                        // 登录成功
                        // 获取当前系统时间
                        var date = new Date();
                        // setDate设置天    
                        // date.getDate()获取当前是几号
                        date.setDate(date.getDate() + 7);
                        // 设置cookie
                        // 新的东西
                        // 参数一：键
                        // 参数二：值
                        // 参数三：设置有效期
                        res.cookie("petname", req.body.petname, {
                            expires: date
                        });
                        res.status(200).json({
                            code: 0,
                            info: "登录成功"
                        });
                    } else {
                        // 登录失败
                        res.status(200).json({
                            code: 3,
                            info: "登录失败，密码错误"
                        });
                    }
                }
            });
        } else {
            // 用于不存在
            res.status(200).json({
                code: 1,
                info: "登录失败，该用户不存在"
            });
        }
    });

});