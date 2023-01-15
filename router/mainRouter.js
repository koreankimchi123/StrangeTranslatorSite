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

/* 난해번역 api */

let words1 = ['미','LH','EH','끼','대','댁','댂','댃','댄','댅','댆','댇','댈','댉','댊','댋','댌','댍','댎','댏','댐','댑','댒','댓','댔','댕','댖','댗','댘','댙','댚','댛',
'며','멱','멲','멳','면','멵','멶','멷','멸','멹','멺','멻','멼','멽','멾','멿','몀','몁','몂','몃','몄','명','몆','몇','몈','몉','몊','몋',
'귀','귁','귂','귃','귄','귅','귆','귇','귈','귉','귊','귋','귌','귍','귎','귏','귐','귑','귒','귓','귔','귕','귖','귗','귘','귙','귚','귛',
'파','팍','팎','팏','판','팑','팒','팓','팔','팕','팖','팗','팘','팙','팚','팛','팜','팝','팞','팟','팠','팡','팢','팣','팤','팥','팦','팧',
'피','픽','픾','픿','핀','핁','핂','핃','필','핅','핆','핇','핈','핉','핊','핋','핌','핍','핎','핏','핐','핑','핒','핓','핔','핕','핖','핗',
'비','빅','빆','빇','빈','빉','빊','빋','빌','빍','빎','빏','빐','빑','빒','빓','빔','빕','빖','빗','빘','빙','빚','빛','빜','빝','빞','빟',
'근','유','위','굿',
'삐','삑','삒','삓','삔','삕','삖','삗','삘','삙','삚','삛','삜','삝','삞','삟','삠','삡','삢','삣','삤','삥','삦','삧','삨','삩','삪','삫',
'포','폭','폮','폯','폰','폱','폲','폳','폴','폵','폶','폷','폸','폹','폺','폻','폼','폽','폾','폿','퐀','퐁','퐂','퐃','퐄','퐅','퐆','퐇',
'거','걱','걲','걳','건','걵','걶','걷','걸','걹','걺','걻','걼','걽','걾','걿','검','겁','겂','것','겄','겅','겆','겇','겈','겉','겊','겋',
'겨','격','겪','겫','견','겭','겮','겯','결','겱','겲','겳','겴','겵','겶','겷','겸','겹','겺','겻','겼','경','겾','겿','곀','곁','곂','곃',
'꺼','공','흫','ㅱ','우','cl','lo','rn','병','배','디','끄','구',
'켜','켝','켞','켟','켠','켡','켢','켣','켤','켥','켦','켧','켨','켩','켪','켫','켬','켭','켮','켯','켰','켱','켲','켳','켴','켵','켶','켷',
'ㅂ','앟','넣',
'티','틱','틲','틳','틴','틵','틶','틷','틸','틹','틺','틻','틼','틽','틾','틿','팀','팁','팂','팃','팄','팅','팆','팇','팈','팉','팊','팋',
'익','든','T','L','또','야','l','백','개','새','포','EU','U','ij','OH','환','응','권','ㅅㅂㄹㅁ',
'조조','돌돔','존좋','스시','복복','부부','북북','불붙','뚀','주작','주주','굴국','속삭','고고','뀨','보보',
'쁐쁐','ㄱㅂㄹㅌ'
];

let words2 = ['lZl','내','태','77l','머','먹','먺','먻','먼','먽','먾','먿','멀','멁','멂','멃','멄','멅','멆','멇','멈','멉','멊','멋','멌','멍','멎','멏','멐','멑','멒','멓',
'띠','띡','띢','띣','띤','띥','띦','띧','띨','띩','띪','띫','띬','띭','띮','띯','띰','띱','띲','띳','띴','띵','띶','띷','띸','띹','띺','띻',
'커','컥','컦','컧','컨','컩','컪','컫','컬','컭','컮','컯','컰','컱','컲','컳','컴','컵','컶','컷','컸','컹','컺','컻','컼','컽','컾','컿',
'과','곽','곾','곿','관','괁','괂','괃','괄','괅','괆','괇','괈','괉','괊','괋','괌','괍','괎','괏','괐','광','괒','괓','괔','괕','괖','괗',
'괴','괵','괶','괷','괸','괹','괺','괻','괼','괽','괾','괿','굀','굁','굂','굃','굄','굅','굆','굇','굈','굉','굊','굋','굌','굍','굎','굏',
'네','넥','넦','넧','넨','넩','넪','넫','넬','넭','넮','넯','넰','넱','넲','넳','넴','넵','넶','넷','넸','넹','넺','넻','넼','넽','넾','넿',
'ㄹ','윾','읶','긋',
'볘','볙','볚','볛','볜','볝','볞','볟','볠','볡','볢','볣','볤','볥','볦','볧','볨','볩','볪','볫','볬','볭','볮','볯','볰','볱','볲','볳',
'쪼','쪽','쪾','쪿','쫀','쫁','쫂','쫃','쫄','쫅','쫆','쫇','쫈','쫉','쫊','쫋','쫌','쫍','쫎','쫏','쫐','쫑','쫒','쫓','쫔','쫕','쫖','쫗',
'지','직','짂','짃','진','짅','짆','짇','질','짉','짊','짋','짌','짍','짎','짏','짐','집','짒','짓','짔','징','짖','짗','짘','짙','짚','짛',
'저','적','젂','젃','전','젅','젆','젇','절','젉','젊','젋','젌','젍','젎','젏','점','접','젒','젓','젔','정','젖','젗','젘','젙','젚','젛',
'77ㅓ','끙','홓','딩','윽','d','b','m','ㅹ','IdH','ㅁ','고','ㅋ',
'궈','궉','궊','궋','권','궍','궎','궏','궐','궑','궒','궓','궔','궕','궖','궗','궘','궙','궚','궛','궜','궝','궞','궟','궠','궡','궢','궣',
'너','왕','봉',
'더','덕','덖','덗','던','덙','덚','덛','덜','덝','덞','덟','덠','덡','덢','덣','덤','덥','덦','덧','덨','덩','덪','덫','덬','덭','덮','덯',
'의','E','ㅜ','ㄴ','SE','OF','I','뿌','7H','∧H','딜','日J','lJ','y','애','호도','% ','급','섊',
'쬬','뚊','쬲','씌','뾲','쀼','쀾','쁉','도도','짞','쮸','뀱','쏶','꾜','구구',"뾰",
'붓x4 X','걡',
];

router.post('/translateAPI2', function(req, res){
  let query1 = req.body.query;
  for(let i = 0; i < words1.length; i++){
    if(query1.includes(words1[i])){
      console.log('Origin Text: ' + query1);
      let regex = new RegExp(`${words1[i]}`, 'gm');
      query1 = query1.replace(regex, `{%${i}%}`);
      console.log('Replaced Text: ' + query1);
    }
    if(query1.includes(words2[i])){
      console.log('Origin Text: ' + query1);
      let regex = new RegExp(`${words2[i]}`, 'gm');
      query1 = query1.replace(regex, `{%${i+words1.length}%}`);
      console.log('Replaced Text: ' + query1);
    }
  }
  for(let i = 0; i < words2.length; i++){
    if(query1.includes(`{%${i}%}`)){
      let regex = new RegExp(`{%${i}%}`, 'gm');
      query1 = query1.replace(regex, words2[i]);
    }
  }
  for(let i = words1.length; i < 2*(words1.length); i++){
    if(query1.includes(`{%${i}%}`)){
      let regex = new RegExp(`{%${i}%}`, 'gm');
      query1 = query1.replace(regex, words1[i-words1.length]);
    }
  }
  res.send(query1);
  console.log(query1);

})

/*----------------------------
        papago api(star)
------------------------------*/
var client_id = 'rftew1xkEQX0x4LXYFhE';
var client_secret = 'f0EY3J0B36';
let ids = ['LWny4rdaLPHYO2EkHgVX','T7yPwwFKVtpuGSX1SA0v','rftew1xkEQX0x4LXYFhE','PKetq7m_ykq6rFvNNF1M','CafS_hWvisnpz5tRH613']
let pws = ['Op5NP4DkAT','JGiuYbJ5Ck','f0EY3J0B36','rJpgov6bZh','uow9_wSyC4']
let idRotate = 0;

router.post('/translateAPI1', function (req, res) {
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