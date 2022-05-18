const express = require("express");
const app = express();
const mongoose = require("mongoose");
const threadRouter = require('./route/threadRoutes');
const static = express.static("public");
const PORT = 3000;

app.use(threadRouter);
app.use(static);

//データベースに接続
mongoose.connect("mongodb+srv://test:test@cluster0.w8j7a.mongodb.net/threads?retryWrites=true&w=majority")
.then(() => console.log('db connected'))
.catch((err) => console.log(err));

app.listen(PORT, () => {
	console.log('サーバーを起動');
});
