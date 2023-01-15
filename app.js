const express = require("express");
const helmet = require("helmet");
const app = express();
const bodyParser = require("body-parser")
const ejs = require("ejs");


//<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *;**script-src 'self' http://onlineerp.solution.quebec 'unsafe-inline' 'unsafe-eval';** ">

app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))

app.set("view engine",'ejs');
app.set('views','./views');
app.use('/public', express.static(__dirname + '/public'));

const mainRouter = require("./router/mainRouter");
app.use("/", mainRouter);

app.listen(3000,function(req, res){
    console.log("서버가 실행되고 있습니다.");
})