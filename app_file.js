let express = require('express');
let bodyparser = require('body-parser');
let fs = require('fs');
let app = express();
app.locals.pretty = true;

//post방식으로 요청이 들어요면 이 모듈 객체가 가로채서 body내용을 req객체 안에
// body라는 프로퍼티를 만들어 그안에 파싱한다.
app.use(bodyparser.urlencoded({ extended: false }));
app.listen(3000, function () {
    console.log('connedted, 3000 port!');
})

app.set('views', './webapp_file');
app.set('view engine', 'pug');

app.get('/topic/new', function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', { topics: files });
    });
})


app.get(['/topic', '/topic/:id'], function (req, res) {
    let id = req.params.id;
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        if (id) {
            fs.readFile('data/' + id, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', { topics: files, title: id, description: data });
            })
        }
        else {
            res.render('view', { topics: files, title: 'welcome', description: 'Hello dotun' });
        }
    })
})

app.post('/topic', function (req, res) {
    let title = req.body.title;
    let description = req.body.description;
    fs.writeFile('./data/' + title, description, function (err) {
        if (err) {
            console.log(err);
            res.status(501).send('Internal Server Error');
        }
        res.redirect('/topic/' + title);
    });
})