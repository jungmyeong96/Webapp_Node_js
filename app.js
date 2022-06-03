let express = require('express');
let app = express();

app.listen(3000, function() {
    console.log('Connected 3000 port!');
});

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
    
    let output = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        <body>
            Hello Dynamic!!!!
        </body>
    </html>`;
    res.send(output); // grave accent를 사용하면 오류없이 여러문장을 변수에 담기가능함
});

