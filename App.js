const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(express.urlencoded({ extended: true }));
app.set('view engnine', 'ejs');

let db;
MongoClient.connect(
	'mongodb+srv://userid:password@cluster0.cfdkr.mongodb.net/todoapp?retryWrites=true&w=majority',
	function (err, client) {
		if (err) console.log(err);
		db = client.db('todoapp'); // todoapp db에 연결 요청

		app.listen('8080', function () {
			console.log('8080 listening');
		});
	}
);

app.get('/pet', function (req, res) {
	res.send('반갑습니다.');
});
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/write', function (req, res) {
	res.sendFile(__dirname + '/write.html');
});

app.post('/add', (req, res) => {
	res.send('전송완료');
	console.log(req.body);
	db.collection('post').insertOne(
		{
			date: req.body.date,
			title: req.body.title,
		},
		function (err, res) {
			console.log('저장완료');
		}
	);
});

//list로 GET요청으로 접속하면
//실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML을 보여줌
app.get('/list', function (req, response) {
	//DB에 저장된 Post라는 collection안의 모든 데이터를 꺼내주세요.
	db.collection('post')
		.find()
		.toArray(function (err, result) {
			console.log('result', result);
			response.render('list.ejs', { posts: result });
		});
});
