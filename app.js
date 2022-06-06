let express = require('express');
const res = require('express/lib/response');
const bodyParser = require('body-parser');
let app = express();


app.listen(3000, function() {
    console.log('Connected 3000 port!');
});





/* 쿼리스트링을 사용한 페이지처리 */
app.get('/topic', function(req, res) {
    let topics = [
        'javascript is ....',
        'nodejs is ....',
        'express is ....'
    ];
    let output =`
        <a href="/topic?id=0">Javascript</a><br>
        <a href="/topic?id=1">Nodejs</a><br>
        <a href="/topic?id=2">Express</a><br><br>
        ${topics[req.query.id]}   
    `
    res.send(output);
    //res.send(req.query.id + ',' + req.query.name);
})


/* semantic url */

app.get('/topic/:id', function(req, res) {
    let topics = [
        'javascript is ....',
        'nodejs is ....',
        'express is ....'
    ];
    let output =`
        <a href="/topic/0">Javascript</a><br>
        <a href="/topic/1">Nodejs</a><br>
        <a href="/topic/2">Express</a><br><br>
        ${topics[req.params.id]}   
    `
    res.send(output);
    //res.send(req.query.id + ',' + req.query.name);
})

app.get('/topic/:id/:mode', function(req, res) {
    res.send(req.params.id+ ', ' + req.params.mode);
    //res.send(req.query.id + ',' + req.query.name);
})


/* pug를 사용한 템플릿처리 */

app.locals.pretty = true; //이거 없어도 이쁘게됨
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/template',function(req, res) {
    res.render('temp', {time:Date(), _title:'pug'}); //파라미터: 템플릿의 이름, 템플릿에 넘겨줄 파라미터
})



/* form을 이용한 페이지 처리 */
app.use(bodyParser.urlencoded({ extended:false})) //현재는 필요없음
app.get('/form', function(req, res){
    res.render('form');
})

app.get('/form_receiver', function(req, res){ //get방식
    let title = req.query.title;
    let description = req.query.description;
    res.send(title + ', ' + description);
}) 

app.post('/form_receiver', function(req, res){ //post방식 pug부터는 바디파서없어도 파싱가능
    let title = req.body.title;
    let description = req.body.description;
    res.send(title + ', ' + description);
}) 



/* 라우터 get */
//클라이언트로부터 받은 요청을 파싱하여 콜백함수 실행

app.get('/', function(req, res) {
    res.send('Hello home page');
});

app.get('/login', function(req, res) {
    res.send('Login please');
});




/* 정적인 파일이 위치할 디렉토리를 정하는 기능 */
//브라우저에서 localhost:포트/정적파일
//public에 정적파일이 있다면 라우트 경로가 어디든 찾아지는 것 같다.

app.use(express.static('public'));

app.get('/route', function(req, res) {
    res.send('Hello Router, <img src="/hamster.png">');
});


/* 동적파일처리 */
/*동적인 파일의 경우 정적파일과 달리 서버를 종료 후 재실행시켜야 수정된 부분이 적용됨 */
/*정적 파일의 경우 요청이 들어올 때마다 노드가 던져주기 때문에 바로 적용되는 것 */
app.get('/dynamic', function(req, res) {
    let lis = '';
    for (var i = 0; i < 5 ; i++){
        lis = lis + '<li>coding</li>';
    }
    let time = Date();
    let output = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        <body>
            Hello Dynamic!!!!
            <ul>
                ${lis}
            </ul> 
            ${time}
        </body>
    </html>`;//변수를 호출하기 위해 ${}
    res.send(output); // grave accent를 사용하면 오류없이 여러문장을 변수에 담기가능함
});

//node로 js파일을 실행 시킬때 supervisor를 사용하여 실행시키면 알아서 변화를 눈치챔