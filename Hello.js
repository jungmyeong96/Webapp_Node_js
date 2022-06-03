/* nodejs는 서버를 구축해 놓음 가져다 쓰기만 잘하자 */

const http = require('http'); // 아래의 코드가 구현되기 위해서는 http라는 모듈을 가져와야함
 
const hostname = '127.0.0.1';
const port = 1337;
 
http.createServer((req, res) => {
 res.writeHead(200, { 'Content-Type': 'text/plain' });
 res.end('Hello World\n');
}).listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}/`);
});

//http가 가진 함수 createServer() 를 호출하여 a new instance of Server를 반환
//server인스턴스로 listen()함수를 호출하여 클라이언트의 요청을 받음