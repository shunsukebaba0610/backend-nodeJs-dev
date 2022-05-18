const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const POST = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

io.on("connection", (socket) => {
	console.log('ユーザが接続しました。');
	//クライアント送信されたメッセージを受け取る
	socket.on('chat message', (msg) => {
		// console.log('メッセージ' + msg);
		//クライアント送信されたメッセージをクライアントに返す
		io.emit('chat message', msg);
	});
});

server.listen(POST, () => {
	console.log('listen on 3000');
});