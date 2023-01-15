const express = require('express');
const router = express.Router();

router.get("/", function(req, res){
    res.render('index',{title:"메인페이지임암튼만들기귀찮음"});
})

router.get("/movie", function(req, res){
    res.render('movie');
})
router.get("/todolist", function(req, res){
    res.render('todo');
})
router.get("/strangetranslate", function(req, res){
    res.render('strangetranslator');
})

router.get("/about", function(req, res){
    res.send('About page');
})

router.post("/postapi", function(req, res){
    let body = req.body;
    console.log(body.query);
    res.send('Post API');
})

/*----------------------------
        papago api(star)
------------------------------*/
var client_id = 'rftew1xkEQX0x4LXYFhE';
var client_secret = 'f0EY3J0B36';
let ids = ['LWny4rdaLPHYO2EkHgVX','T7yPwwFKVtpuGSX1SA0v','rftew1xkEQX0x4LXYFhE','PKetq7m_ykq6rFvNNF1M','CafS_hWvisnpz5tRH613']
let pws = ['Op5NP4DkAT','JGiuYbJ5Ck','f0EY3J0B36','rJpgov6bZh','uow9_wSyC4']
let idRotate = 0;

router.post('/translateAPI', function (req, res) {
    client_id = ids[idRotate];
    client_secret = pws[idRotate];
    console.log("id is now: " + idRotate);
    let query = req.body.query;

   var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
   var request = require('request');
   var options = {
       url: api_url,
       form: {'source':'ko', 'target':'ja', 'text':query},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    let text;
    const promise = new Promise((resolve, reject) => {
        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              let bodyJSON = JSON.parse(body);
              console.log("original text: " + options.form.text);
              text = bodyJSON.message.result.translatedText;
              console.log("translate API response: " + text);
              
            } else {
              res.status(response.statusCode).end();
              console.log('error = ' + response.statusCode);
              text = ('error = ' + response.statusCode);
            }
            resolve(text);
          });
        
    })

    promise.then((value) => {

        return new Promise((resolve, reject) => {
            options.form.source = 'ja';
            options.form.target = 'zh-CN';
            options.form.text = value;
            request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              let bodyJSON = JSON.parse(body);
              console.log("original text: " + options.form.text);
              text = bodyJSON.message.result.translatedText;
              console.log("translate API response: " + text);
              resolve(text);
            } else {
              res.status(response.statusCode).end();
              console.log('error = ' + response.statusCode);
              text = ('error = ' + response.statusCode);
            }
            resolve(text);
          });
        });
        
    })
    .then((value) => {

        return new Promise((resolve, reject) => {
            options.form.source = 'zh-CN';
            options.form.target = 'ko';
            options.form.text = value;
            request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              let bodyJSON = JSON.parse(body);
              console.log("original text: " + options.form.text);
              text = bodyJSON.message.result.translatedText;
              console.log("translate API response: " + text);
              resolve(text);
            } else {
              res.status(response.statusCode).end();
              console.log('error = ' + response.statusCode);
              text = ('error = ' + response.statusCode);
            }
            resolve(text);
          });
        });
        
    })
    .then((value) => {

        return new Promise((resolve, reject) => {
            options.form.source = 'ko';
            options.form.target = 'fr';
            options.form.text = value;
            request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              let bodyJSON = JSON.parse(body);
              console.log("original text: " + options.form.text);
              text = bodyJSON.message.result.translatedText;
              console.log("translate API response: " + text);
              resolve(text);
            } else {
              res.status(response.statusCode).end();
              console.log('error = ' + response.statusCode);
              text = ('error = ' + response.statusCode);
            }
            resolve(text);
          });
        });
        
    })
    .then((value) => {

        return new Promise((resolve, reject) => {
            options.form.source = 'en';
            options.form.target = 'ja';
            options.form.text = value;
            request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              let bodyJSON = JSON.parse(body);
              console.log("original text: " + options.form.text);
              text = bodyJSON.message.result.translatedText;
              console.log("translate API response: " + text);
              resolve(text);
            } else {
              res.status(response.statusCode).end();
              console.log('error = ' + response.statusCode);
              text = ('error = ' + response.statusCode);
            }
            resolve(text);
          });
        });
        
    })
    .then((value) => {

      return new Promise((resolve, reject) => {
          options.form.source = 'ja';
          options.form.target = 'ko';
          options.form.text = value;
          request.post(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            let bodyJSON = JSON.parse(body);
            console.log("original text: " + options.form.text);
            text = bodyJSON.message.result.translatedText;
            console.log("translate API response: " + text);
            resolve(text);
          } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
            text = ('error = ' + response.statusCode);
          }
          resolve(text);
        });
      });
      
  })
    .then((value) => {

      return new Promise((resolve, reject) => {
          options.form.source = 'fr';
          options.form.target = 'ko';
          options.form.text = value;
          request.post(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            let bodyJSON = JSON.parse(body);
            console.log("original text: " + options.form.text);
            text = bodyJSON.message.result.translatedText;
            console.log("translate API response: " + text);
            resolve(text);
          } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
            text = ('error = ' + response.statusCode);
          }
          resolve(text);
        });
      });
      
  })
    .then((value) => {

        return new Promise((resolve, reject) => {
            options.form.source = 'ko';
            options.form.target = 'zh-TW';
            options.form.text = value;
            request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              let bodyJSON = JSON.parse(body);
              console.log("original text: " + options.form.text);
              text = bodyJSON.message.result.translatedText;
              console.log("translate API response: " + text);
              resolve(text);
            } else {
              res.status(response.statusCode).end();
              console.log('error = ' + response.statusCode);
              text = ('error = ' + response.statusCode);
            }
            resolve(text);
          });
        });
        
    })

    .then((value) => {
        options.form.source = 'zh-TW';
        options.form.target = 'ko';
        options.form.text = value;
        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
              res.end(body);
              let bodyJSON = JSON.parse(body);
              console.log("original text: " + options.form.text);
              text = bodyJSON.message.result.translatedText;
              console.log("translate API response: " + text);
              //resolve(text);
            } else {
              res.status(response.statusCode).end();
              console.log('error = ' + response.statusCode);
              idRotate++;
              if(idRotate > 4) idRotate = 0;
            }
          });
    });
   

 });




//----------------------------------------------------------------




// router.post('/translateAPI', function (req, res) {
//     let query = req.body.query;

//    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
//    var request = require('request');
//    var options = {
//        url: api_url,
//        form: {'source':'ko', 'target':'en', 'text':query},
//        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
//     };
//    request.post(options, function (error, response, body) {
//      if (!error && response.statusCode == 200) {
//        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//        res.end(body);
//        let bodyJSON = JSON.parse(body);
//        let text = bodyJSON.message.result.translatedText;
//        console.log("translate API response: " + text);
//      } else {
//        res.status(response.statusCode).end();
//        console.log('error = ' + response.statusCode);
//      }
//    });

//  });

 /*----------------------------
        papago api(end)
-------------------------------*/

module.exports = router;