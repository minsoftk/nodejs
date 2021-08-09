const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(
	'mongodb+srv://minsoftk:qwer1234@cluster0.cfdkr.mongodb.net/todoapp?retryWrites=true&w=majority',
	function (err, client) {
		if (err) console.log(err);
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
});
